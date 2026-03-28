from PIL import Image
import numpy as np
import requests
from backend.services.weather_service import get_weather

def basic_analysis(file):
    image = Image.open(file).convert("RGB")
    arr = np.array(image)
    avg_color = arr.mean()
    if avg_color < 80:
        return "dark leaves, possible fungal issue"
    elif avg_color > 180:
        return "yellowing leaves, possible nutrient deficiency"
    else:
        return "normal leaf with slight variation"

def ask_ollama(plant_type, location, description, lang="en", weather=None, logs=None, soil_info=None):
    language_instruction = "Answer in Hindi." if lang == "hi" else "Answer in English."
    log_summary = "No logs available"
    if logs:
        watering = [log for log in logs if log.get("action") == "watering"]
        diagnosis = [log for log in logs if log.get("action") == "diagnosis"]
        log_summary = f"Latest watering logs: {watering[-3:]}. Latest diagnosis logs: {diagnosis[-3:]}."
    prompt = f"""
You are a professional plant pathologist and agricultural expert providing precise diagnosis.

Plant: {plant_type}
Location: {location}
Observed condition: {description}

Weather conditions: {weather if weather else "Not available"}
Soil conditions: {soil_info if soil_info else "Not available"}

{log_summary}

{language_instruction}

Provide a detailed diagnosis covering:
1. Most likely issue or disease (scientific name and common name)
2. Reason based on plant + climate (evidence from symptoms, weather, and logs)
3. Exact actionable treatment (step-by-step professional recommendations)
4. Watering advice (adjusted for condition and weather)
5. Whether urgent or not (priority level and timeline)
6. Prevention strategies (long-term measures to avoid recurrence)
7. Monitoring recommendations (what to observe and when to re-evaluate)

Structure your response in clear, professional bullet points. Ensure all advice is evidence-based and tailored to the plant type and location.
"""
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()["response"]
    
def analyze_plant_image(file, plant_type, location, lang="en", logs=None, soil_info=None):
    try:
        desc = basic_analysis(file)
        # Optional weather
        weather = None
        try:
            weather = get_weather(location)
        except:
            pass
        ai_response = ask_ollama(
            plant_type=plant_type,
            location=location,
            description=desc,
            lang=lang,
            weather=weather,
            logs=logs,
            soil_info=soil_info
        )
        return {
            "disease": desc,
            "ai_advice": ai_response,
            "log_summary": logs[-3:] if logs else []
        }
    except Exception as e:
        return {"error": str(e)}