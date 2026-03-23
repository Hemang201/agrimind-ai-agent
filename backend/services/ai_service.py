import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_ai_response(plant, weather, lang="en"):
    lang_instruction = "Answer in Hindi." if lang == "hi" else "Answer in English."
    prompt = f"""
You are a professional agricultural consultant providing expert analysis.

Plant: {plant["name"]}
Type: {plant["plant_type"]}
Logs: {plant["logs"]}
Weather: {weather}

{lang_instruction}

Provide a comprehensive analysis covering:
1. Health explanation (detailed assessment based on logs and weather)
2. Watering advice (specific recommendations with timing and amounts)
3. Risks and warnings (potential issues and preventive measures)
4. Recommendations (immediate actions, long-term care, and best practices)
5. Growth stage insights (how current stage affects care)
6. Environmental factors (weather impact and adaptations)

Structure your response in clear, professional bullet points. Ensure all points are actionable and evidence-based.
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


def chat_with_ai(question: str, context: str = "", lang: str = "en"):
    language_instruction = "Answer in Hindi." if lang == "hi" else "Answer in English."
    prompt = f"""
You are an advanced agriculture AI assistant.

Question: {question}
Context: {context}

{language_instruction}

Provide a clear, concise answer and any next steps.
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
        return response.json().get("response", "No response from AI")
    except Exception as e:
        print("Ollama Error:", e)
        return "AI service unavailable"
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