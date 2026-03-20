from fastapi import FastAPI
from backend.services.weather_service import get_weather
from backend.services.watering_service import calculate_watering
from backend.services.plant_service import (
    create_plant,
    get_plant,
    get_all_plants,
    log_action,
    update_growth
)
app = FastAPI()

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
def add_log(name: str, action: str, value: float):
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

@app.get("/health")
def health():
    return {"status": "ok"}