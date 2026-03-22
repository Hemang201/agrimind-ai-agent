import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_ai_response(plant, weather):
    prompt = f"""
    You are an expert Indian agriculture advisor.

    Explain like you are talking to a farmer.

    Plant: {plant["name"]}
    Type: {plant["plant_type"]}
    Logs: {plant["logs"]}
    Weather: {weather}

    Give:
    - Watering advice
    - Risk warnings
    - Simple explanation
    - 3–5 bullet points only
    """

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "mistral",
                "prompt": prompt,
                "stream": False
            }
        )

        data = response.json()
        return data.get("response", "No response from AI")

    except Exception as e:
        print("Ollama Error:", e)
        return "AI service unavailable"