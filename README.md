# 🌱 AgriMind AI - Your Intelligent Farming Companion

AgriMind is a modern AI-powered agricultural dashboard designed to help farmers and gardeners monitor plant health, diagnose diseases, and interact with a bilingual (English/Hindi) AI assistant through both text and voice.

## 🚀 Key Features

- **📸 AI Diagnostic**: Upload plant photos to detect diseases and get immediate growth strategies.
- **🎙️ Talk to Agri AI**: Fully integrated voice-to-text (STT) and text-to-voice (TTS) interaction supporting English and Hindi. **No external system binaries (FFmpeg) required.**
- **🌤️ Local Analytics**: Real-time weather integration to provide context-aware watering and care advice.
- **📊 Plant Management**: Track multiple plants, their growth stages, and historical watering logs.
- **🌱 Soil Intelligence**: Customizable soil profiles (Minerals, NPK, Moisture) to optimize plant growth.

---

## ⚡ Quick Start (Windows)

For a fast setup, just follow these three steps:

1. **Install Dependencies**: `pip install -r requirements.txt`
2. **Start the AI**: `ollama pull mistral`
3. **Launch the Server**: `python -m uvicorn backend.main:app --reload`
4. **Open in Browser**: 👉 **[http://localhost:8000](http://localhost:8000)**

---

## 🛠️ Prerequisites

1. **Python 3.10+**: Ensure you have Python installed.
2. **Ollama**: Required for the local AI logic.
   - Install from [ollama.com](https://ollama.com).
   - Pull the Mistral model: `ollama pull mistral`.
3. **Google Chrome / Edge**: Recommended for the best Web Audio experience.

---

## ⚙️ Detailed Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/agrimind-ai.git
   cd agrimind-ai
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   venv\Scripts\activate   # On Windows
   source venv/bin/activate  # On macOS/Linux
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**:
   Create a `.env` file in the root directory (optional for HuggingFace backup):
   ```env
   HF_TOKEN=your_huggingface_token
   ```

---

## 🏃 Running the Application

1. **Start the FastAPI Server**:
   ```bash
   python -m uvicorn backend.main:app --reload
   ```

2. **Access the App**:
   Open your browser and navigate to:
   👉 **[http://localhost:8000](http://localhost:8000)**

> [!IMPORTANT]
> **Why localhost?** The "Talk to AI" voice feature requires the page to be served over `http://localhost:8000` to access the browser's microphone and secure speech features correctly. Opening the `index.html` file directly as a file will cause errors.

---

## 🛠️ Project Structure

- `/backend`: FastAPI routes and AI services (Weather, Soil, LLM integration).
- `/frontend`: Responsive dashboard UI built with HTML, CSS, and interactive JavaScript.
- `/uploads`: Temporary storage for diagnostic images.

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any features or bug fixes! 🍀