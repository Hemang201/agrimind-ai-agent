from fastapi import FastAPI
from fastapi import FastAPI, File, UploadFile, Body, Form
from PIL import Image
import io
import os
import requests
from backend.services.diagnosis_service import analyze_plant_image
from backend.services.weather_service import get_weather
from backend.services.watering_service import calculate_watering
from backend.services.health_service import calculate_health_score
from backend.services.alert_service import generate_alerts
from backend.services.ai_service import generate_ai_response, chat_with_ai
from backend.services.recommendation_service import recommend_crops
from backend.services.soil_service import lookup_preset_soil
from backend.utils.storage import save_ai_chat
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from backend.services.plant_service import (
    create_plant,
    get_plant,
    get_all_plants,
    log_action,
    update_growth
)
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

token = os.getenv("HF_TOKEN")
print("TOKEN:", token)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

@app.get("/")
def root():
    return {"message": "AgriMind API is running"}

# Create plant
@app.post("/plant")
def add_plant(name: str, plant_type: str, city: str, soil_type: str = "", soil_minerals: str = ""):
    plant = create_plant(name, plant_type, city, soil_type, soil_minerals)
    return plant.to_dict()

# Get all plants
@app.get("/plants")
def list_plants():
    plants = get_all_plants()
    enriched = []
    for plant in plants:
        health = calculate_health_score(plant)
        plant["health_score"] = health.get("health_score", 0)
        plant["health_status"] = health.get("status", "Unknown")
        enriched.append(plant)
    return {"plants": enriched}

# Get single plant
@app.get("/plant/{name}")
def get_single_plant(name: str):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}
    return plant.to_dict()

@app.get("/plant/{name}/ai")
def ai_insights(name: str, lang: str = "en"):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}
    plant_data = plant.to_dict()
    weather = get_weather(plant.city)
    response = generate_ai_response(plant_data, weather, lang=lang)
    return {
        "plant": name,
        "ai_advice": response
    }

@app.post("/talk")
def talk_to_ai(payload: dict = Body(...)):
    question = payload.get("question", "").strip()
    lang = payload.get("lang", "en")
    if not question:
        return {"error": "Question is required."}
    plants = get_all_plants()
    context = "\n".join([f"{p['name']} ({p['plant_type']}): stage={p['growth_stage']}, logs={len(p['logs'])}" for p in plants])
    answer = chat_with_ai(question, context=context, lang=lang)
    save_ai_chat({
        "question": question,
        "answer": answer,
        "context": context,
        "lang": lang
    })
    return {"question": question, "answer": answer}

@app.get("/recommend")
def recommend(city: str, season: str = None, plant_type: str = None, soil_type: str = None, soil_minerals: str = None):
    weather = get_weather(city)
    if not weather:
        return {"error": "Weather unavailable; verify city"}
    return recommend_crops(city, weather, season, plant_type, soil_type)

# Update growth stage
@app.put("/plant/{name}/growth")
def update_plant_growth(name: str, stage: str):
    plant = update_growth(name, stage)
    if not plant:
        return {"error": "Plant not found"}
    return plant.to_dict()

# Log action (watering, fertilizing, etc.)
@app.post("/plant/{name}/log")
def add_log(name: str, payload: dict = Body(...)):
    action = payload.get("action")
    value = payload.get("value")
    if not action or value is None:
        return {"error": "Missing action or value"}
    plant = log_action(name, action, {"value": value})
    if not plant:
        return {"error": "Plant not found"}
    return plant.to_dict()

# Smart watering per plant
@app.get("/plant/{name}/watering")
def plant_watering(name: str):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}
    weather = get_weather(plant.city)
    if not weather:
        return {"error": "Weather unavailable"}
    plan = calculate_watering(
        temperature=weather["temperature"],
        humidity=weather["humidity"],
        rain=weather["rain"]
    )
    return {
        "plant": plant.name,
        "city": plant.city,
        "growth_stage": plant.growth_stage,
        "weather": weather,
        "watering_plan": plan,
        "logs": plant.logs
    }

@app.post("/plant/{name}/watering")
def add_watering_log(name: str, amount: float = 0.0, unit: str = "liters"):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}
    weather = get_weather(plant.city)
    if not weather:
        return {"error": "Weather unavailable"}
    plan = calculate_watering(
        temperature=weather["temperature"],
        humidity=weather["humidity"],
        rain=weather["rain"]
    )
    if amount > 0:
        log_action(name, "watering", {
            "amount": amount,
            "unit": unit,
            "weather": weather,
            "plan": plan,
            "stage": plant.growth_stage
        })
    plant_updated = get_plant(name)
    health = calculate_health_score(plant_updated.to_dict())
    return {
        "plant": plant.name,
        "city": plant.city,
        "growth_stage": plant.growth_stage,
        "weather": weather,
        "watering_plan": plan,
        "logged_amount": amount,
        "health": health
    }

@app.get("/watering/{city}")
def watering(city: str):
    weather = get_weather(city)
    if not weather:
        return {"error": "Invalid city or API issue"}
    result = calculate_watering(
        temperature=weather["temperature"],
        humidity=weather["humidity"],
        rain=weather["rain"]
    )
    return {
        "weather": weather,
        "watering_plan": result
    }

@app.post("/plant/{name}/diagnose")
def diagnose(name: str, lang: str = "en", file: UploadFile = File(...)):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}
    plant_type = plant.plant_type
    location = plant.city
    soil_info = f"Type: {getattr(plant, 'soil_type', 'Unknown')}, Minerals: {getattr(plant, 'soil_minerals', 'Unknown')}"
    result = analyze_plant_image(file.file, plant_type, location, lang=lang, logs=plant.logs, soil_info=soil_info)
    if "error" not in result:
        log_action(name, "diagnosis", {
            "issue": result.get("disease", "Unknown"),
            "ai_advice": result.get("ai_advice", ""),
            "lang": lang
        })
    return result

@app.get("/plant/{name}/analytics")
def plant_analytics(name: str, lang: str = "en"):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}
    plant_data = plant.to_dict()
    weather = get_weather(plant.city)
    if not weather:
        weather = {
            "temperature": 0,
            "humidity": 0,
            "description": "unknown"
        }
    health = calculate_health_score(plant_data)
    alerts = generate_alerts(plant_data, weather)
    lang_instruction = "Provide response in Hindi." if lang == "hi" else "Provide response in English."
    prompt = f"""
    You are an expert plant care assistant.
    Plant: {plant.plant_type}
    Location: {plant.city}
    Soil Type: {plant_data.get('soil_type', 'Unknown')}
    Mineral Content: {plant_data.get('soil_minerals', 'Unknown')}
    Weather:
    Temperature: {weather['temperature']}°C
    Humidity: {weather['humidity']}%
    Condition: {weather['description']}
    Logs: {plant_data['logs']}
    Growth Stage: {plant_data['growth_stage']}
    Health Score: {health}

    {lang_instruction}

    Provide:
    1. Health explanation
    2. Watering advice
    3. Risks
    4. Recommendations
    """
    ai_output = "AI not available"
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            }
        )
        ai_output = response.json().get("response", "No AI response")
    except Exception as e:
        print("AI ERROR:", e)
    return {
        "plant": name,
        "health": health,
        "alerts": alerts,
        "weather": weather,
        "ai_insights": ai_output
    }
@app.get("/dashboard")
def dashboard():
    plants = get_all_plants()
    summary = []
    for plant in plants:
        weather = get_weather(plant["city"])
        if not weather:
            continue
        health = calculate_health_score(plant)
        alerts = generate_alerts(plant, weather)

        summary.append({
            "name": plant["name"],
            "health_score": health["health_score"],
            "alerts_count": len(alerts)
        })
    return {"dashboard": summary}

@app.post("/plant/{name}/water")
def log_water(name: str, data: dict):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}

    plant.logs.append({
        "action": "watering",
        "data": data
    })

    return {"message": "Water logged"}

@app.get("/preset-soil/{city}")
def get_preset_soil(city: str):
    return lookup_preset_soil(city)
