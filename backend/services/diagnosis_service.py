from PIL import Image
import numpy as np
import requests

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

def ask_ollama(plant_type, location, description, weather=None):
    prompt = f"""
You are an expert agricultural assistant.

Plant: {plant_type}
Location: {location}
Observed condition: {description}

Weather conditions: {weather if weather else "Not available"}

Provide:
1. Most likely issue or disease
2. Reason based on plant + climate
3. Exact actionable treatment (simple steps)
4. Watering advice
5. Whether urgent or not

Keep it practical and concise.
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
    
def analyze_plant_image(file, plant_type, location):
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
            weather=weather
        )
        return {
            "plant": plant_type,
            "location": location,
            "analysis": desc,
            "ai_diagnosis": ai_response
        }
    except Exception as e:
        return {"error": str(e)}