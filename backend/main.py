from fastapi import FastAPI
from fastapi import FastAPI, File, UploadFile, Body
from PIL import Image
import io
from backend.services.diagnosis_service import analyze_plant_image
from backend.services.weather_service import get_weather
from backend.services.watering_service import calculate_watering
from backend.services.health_service import calculate_health_score
from backend.services.alert_service import generate_alerts
from backend.services.plant_service import (
    create_plant,
    get_plant,
    get_all_plants,
    log_action,
    update_growth
)
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AgriMind API is running"}

# Create plant
@app.post("/plant")
def add_plant(name: str, plant_type: str, city: str):
    plant = create_plant(name, plant_type, city)
    return plant.to_dict()

# Get all plants
@app.get("/plants")
def list_plants():
    return {"plants": get_all_plants()}

# Get single plant
@app.get("/plant/{name}")
def get_single_plant(name: str):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}
    return plant.to_dict()

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
        "watering_plan": plan
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
async def diagnose_plant(name: str, file: UploadFile = File(...)):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    result = analyze_plant_image(image)
    if not file.content_type.startswith("image/"):
        return {"error": "Invalid file type"}
    # Log diagnosis
    log_action(name, "diagnosis", result)
    return {
        "plant": name,
        "diagnosis": result
    }

@app.get("/plant/{name}/analytics")
def plant_analytics(name: str):
    plant = get_plant(name)
    if not plant:
        return {"error": "Plant not found"}
    plant_data = plant.to_dict()
    weather = get_weather(plant.city)
    if not weather:
        return {"error": "Weather unavailable"}
    health = calculate_health_score(plant_data)
    alerts = generate_alerts(plant_data, weather)
    return 
    {
        "plant": name,
        "health": health,
        "alerts": alerts,
        "weather": weather,
        "explanation": "Health score is based on logs, diagnosis, and environmental conditions."
    }
    if not plant_data["logs"]:
        alerts.append("No data available — using default assumptions")

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
