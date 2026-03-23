import json
import os

DATA_DIR = "data"
PLANTS_FILE_PATH = os.path.join(DATA_DIR, "plants.json")
AI_CHAT_FILE_PATH = os.path.join(DATA_DIR, "ai_conversations.json")

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR, exist_ok=True)


def save_data(data):
    with open(PLANTS_FILE_PATH, "w") as f:
        json.dump(data, f, indent=4)


def load_data():
    if not os.path.exists(PLANTS_FILE_PATH):
        return {}
    with open(PLANTS_FILE_PATH, "r") as f:
        return json.load(f)


def save_ai_chat(chat_entry):
    history = []
    if os.path.exists(AI_CHAT_FILE_PATH):
        with open(AI_CHAT_FILE_PATH, "r") as f:
            try:
                history = json.load(f)
            except json.JSONDecodeError:
                history = []
    history.append(chat_entry)
    with open(AI_CHAT_FILE_PATH, "w") as f:
        json.dump(history, f, indent=4)


def load_ai_chat():
    if not os.path.exists(AI_CHAT_FILE_PATH):
        return []
    with open(AI_CHAT_FILE_PATH, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []