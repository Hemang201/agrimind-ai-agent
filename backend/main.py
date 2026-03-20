from fastapi import FastAPI
from backend.services.weather_service import get_weather
from backend.services.watering_service import calculate_watering

app = FastAPI()

@app.get("/")
def root():
    return {"message": "AgriMind API is running"}

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