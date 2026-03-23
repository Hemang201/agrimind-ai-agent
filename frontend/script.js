const API_URL = "http://127.0.0.1:8000";

let currentLang = "en";

const translations = {
    en: {
        title: "AgriMind Dashboard",
        subtitle: "Intelligent Crop Care",
        addPlant: "Add Plant",
        talkAI: "Talk to AI",
        diagnose: "Diagnose Plant",
        upload: "Upload & Diagnose",
        diagnosisResult: "Diagnosis Result",
        yourPlants: "Your Plants",
        addWater: "Add Water",
        updateStage: "Update Growth Stage",
        wateringHistory: "Watering History",
        analytics: "Analytics",
        recommend: "Recommend Crops",
        recommendBtn: "Get Recommendation",
        recommendPlaceholder: "City",
        seasonLabel: "Season",
        plantTypeLabel: "Type",
        health: "Health",
        status: "Status",
        growthStages: {
            germination: "Germination",
            seedling: "Seedling",
            vegetative: "Vegetative",
            flowering: "Flowering",
            mature: "Mature",
            harvest: "Harvest"
        },
        weather: "Weather",
        ai: "AI Insights",
        disease: "Disease",
        advice: "AI Advice",
        placeholders: {
            name: "Plant Name",
            type: "Plant Type",
            city: "City",
            diagnoseName: "Plant Name"
        }
    },
    hi: {
        title: "एग्रीमाइंड डैशबोर्ड",
        subtitle: "बुद्धिमान फ़सल देखभाल",
        addPlant: "पौधा जोड़ें",
        voice: "वॉइस असिस्टेंट",
        diagnose: "पौधे की जांच",
        upload: "अपलोड करें और जांचें",
        diagnosisResult: "निदान परिणाम",
        yourPlants: "आपके पौधे",
        talkAI: "एआई से बात करें",
        addWater: "पानी जोड़ें",
        updateStage: "उर्वरक बढ़ाएँ",
        wateringHistory: "पानी देने का इतिहास",
        recommend: "कृषि सुझाव",
        recommendBtn: "सुझाव प्राप्त करें",
        recommendPlaceholder: "शहर",
        seasonLabel: "ऋतु",
        analytics: "विश्लेषण",
        health: "स्वास्थ्य",
        status: "स्थिति",
        growthStages: {
            germination: "अंकुरण",
            seedling: "रोपण",
            vegetative: "हरितावस्था",
            flowering: "फूल आना",
            mature: "परिपक्व",
            harvest: "फसल कटाई"
        },
        weather: "मौसम",
        ai: "एआई सुझाव",
        disease: "रोग",
        advice: "एआई सलाह",
        placeholders: {
            name: "पौधे का नाम",
            type: "पौधे का प्रकार",
            city: "शहर",
            diagnoseName: "पौधे का नाम"
        }
    }
};

function applyTranslations() {
    const t = translations[currentLang];

    document.title = t.title;
    document.getElementById("site-title").innerText = t.title;
    document.getElementById("site-subtitle").innerText = t.subtitle;

    document.getElementById("add-plant-heading").innerText = t.addPlant;
    document.getElementById("talk-ai-heading").innerText = t.talkAI;
    document.getElementById("recommend-heading").innerText = t.recommend;
    document.getElementById("diagnose-heading").innerText = t.diagnose;
    document.getElementById("diagnosis-result-heading").innerText = t.diagnosisResult;
    document.getElementById("your-plants-heading").innerText = t.yourPlants;

    document.getElementById("talk-ai-btn").innerText = t.talkAI;
    document.getElementById("recommend-btn").innerText = t.recommendBtn;
    document.querySelector("button[onclick='addPlant()']").innerText = t.addPlant;
    document.getElementById("recommend-city").placeholder = t.recommendPlaceholder;
    document.getElementById("recommend-season-label").innerText = t.seasonLabel;
    document.getElementById("recommend-type-label").innerText = t.plantTypeLabel;
    document.querySelector("button[onclick='diagnosePlant()']").innerText = t.upload;

    document.getElementById("name").placeholder = t.placeholders.name;
    document.getElementById("type").placeholder = t.placeholders.type;
    document.getElementById("city").placeholder = t.placeholders.city;
    document.getElementById("diagnose-name").placeholder = t.placeholders.diagnoseName;
    document.getElementById("recommend-city").placeholder = t.recommendPlaceholder;

    loadPlants();
}

function createLanguageToggle() {
    const btn = document.createElement("button");
    btn.innerText = "🌐 हिंदी";
    btn.style.position = "fixed";
    btn.style.top = "10px";
    btn.style.right = "10px";
    btn.style.zIndex = "1000";

    btn.onclick = () => {
        currentLang = currentLang === "en" ? "hi" : "en";
        btn.innerText = currentLang === "en" ? "🌐 हिंदी" : "🌐 English";
        applyTranslations();
    };

    document.body.appendChild(btn);
}

function showLoader(targetId) {
    let loader = document.getElementById("aiLoading");
    if (!loader) {
        loader = document.createElement("div");
        loader.id = "aiLoading";
        loader.className = "ai-loading";
        loader.innerText = "AI is thinking";
    }
    const target = document.getElementById(targetId);
    if (target) {
        target.appendChild(loader);
    }
    loader.style.display = "block";
}

function hideLoader() {
    const loader = document.getElementById("aiLoading");
    if (loader) loader.style.display = "none";
}

function typeHTML(element, html, speed = 15) {
    let i = 0;
    element.innerHTML = "";
    function type() {
        if (i < html.length) {
            element.innerHTML = html.slice(0, i) + "<span class='cursor'>|</span>";
            i++;
            setTimeout(type, speed);
        } else {
            element.innerHTML = html; // remove cursor at end
        }
    }
    type();
}

function formatAIResponse(text) {
    if (!text) return "No insights available";
    // If the response is plaintext without section markers, show plaintext directly.
    if (!text.includes("**")) {
        return `<p>${text.replace(/\n/g, "<br>")}</p>`;
    }
    // Split by sections (**Title**)
    const sections = text.split("**").filter(s => s.trim() !== "");
    if (sections.length === 0) {
        return `<p>${text.replace(/\n/g, "<br>")}</p>`;
    }
    let html = "";
    for (let i = 0; i < sections.length; i += 2) {
        const title = sections[i];
        const content = sections[i + 1] || "";
        html += `<p><strong>👉 ${title}</strong></p>`;
        // Convert sentences into bullet points
        const points = content
            .split(/[\.\n]/) // split by sentences or new lines
            .map(p => p.trim())
            .filter(p => p.length > 0);
        if (points.length > 0) {
            html += "<ul>";
            points.forEach(p => {
                html += `<li>${p}</li>`;
            });
            html += "</ul>";
        } else {
            html += `<p>${content.trim().replace(/\n/g, "<br>")}</p>`;
        }
    }
    return html;
}

async function addPlant() {
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const city = document.getElementById("city").value;
    const response = await fetch(`${API_URL}/plant?name=${name}&plant_type=${type}&city=${city}`, {
        method: "POST"
    });
    const data = await response.json();
    loadPlants();
}

async function loadPlants() {
    const response = await fetch(`${API_URL}/plants`);
    const data = await response.json();
    const container = document.getElementById("plants-container");
    container.innerHTML = "";
    if (data.plants.length === 0) {
        container.innerHTML = `<p>${currentLang === "hi" ? "अभी तक कोई पौधा नहीं जोड़ा गया" : "No plants added yet."}</p>`;
        return;
    }
    data.plants.forEach(plant => {
        const card = document.createElement("div");
        card.className = "plant-card";
        card.innerHTML = `
            <h3>${plant.name}</h3>
            <p><strong>${translations[currentLang].health}:</strong> ${plant.health_score ?? "N/A"}</p>
            <p><strong>${translations[currentLang].status}:</strong> ${plant.health_status ?? "Unknown"}</p>
            <p><strong>Stage:</strong> ${translations[currentLang].growthStages[plant.growth_stage] ?? plant.growth_stage}</p>
            <p><strong>Type:</strong> ${plant.plant_type}</p>
            <p><strong>City:</strong> ${plant.city}</p>
            <p><strong>${translations[currentLang].wateringHistory}:</strong></p>
            ${renderWateringHistory(plant.logs)}
            <div class="growth-update">
                <select id="growth-stage-${plant.name}">
                    <option value="germination" ${plant.growth_stage === 'germination' ? 'selected' : ''}>${translations[currentLang].growthStages.germination}</option>
                    <option value="seedling" ${plant.growth_stage === 'seedling' ? 'selected' : ''}>${translations[currentLang].growthStages.seedling}</option>
                    <option value="vegetative" ${plant.growth_stage === 'vegetative' ? 'selected' : ''}>${translations[currentLang].growthStages.vegetative}</option>
                    <option value="flowering" ${plant.growth_stage === 'flowering' ? 'selected' : ''}>${translations[currentLang].growthStages.flowering}</option>
                    <option value="mature" ${plant.growth_stage === 'mature' ? 'selected' : ''}>${translations[currentLang].growthStages.mature}</option>
                    <option value="harvest" ${plant.growth_stage === 'harvest' ? 'selected' : ''}>${translations[currentLang].growthStages.harvest}</option>
                </select>
                <button onclick="updateGrowthStage('${plant.name}')">${translations[currentLang].updateStage}</button>
            </div>
            ${createWaterLogger(plant.name)}
            <button onclick="handleAnalytics('${plant.name}')">${translations[currentLang].analytics}</button>
            <div id="result-${plant.name}"></div>
        `;
        container.appendChild(card);
        checkWaterReminder(plant.name);
    });
}

function handleAnalytics(name) {
    if (!name || !name.trim()) {
        alert("Plant name not found");
        return;
    }
    getAnalytics(name);
}

function handleDiagnoseCard(name) {
    if (!name || !name.trim()) {
        alert("Plant name not found for diagnosis");
        return;
    }
    const diagnoseNameInput = document.getElementById("diagnose-name");
    if (diagnoseNameInput) {
        diagnoseNameInput.value = name;
    }
    alert(`Selected plant for diagnosis: ${name}\nChoose an image and click Upload & Diagnose.`);
    document.getElementById("image-file")?.scrollIntoView({ behavior: "smooth" });
}

async function getAnalytics(name) {
    const div = document.getElementById(`result-${name}`);
    if (div && div.innerHTML.trim() !== "") {
        div.innerHTML = "";
        return;
    }
    console.log("Fetching:", name);
    showLoader(`result-${name}`);
    try {
        const response = await fetch(`http://127.0.0.1:8000/plant/${name}/analytics?lang=${currentLang}`);
        const data = await response.json();
        console.log("DATA:", data);
        hideLoader();
        const div = document.getElementById(`result-${name}`);
        if (!div) {
            console.error("❌ Result div not found");
            return;
        }
        if (data.error) {
            div.innerHTML = `<p style="color:red;">${data.error}</p>`;
            return;
        }
        const score = data.health.health_score ?? data.health.score ?? 0;
        let color = score > 80 ? "green" : score > 50 ? "orange" : "red";
        const t = translations[currentLang];
        div.innerHTML = `
            <h3>🌿 ${name}</h3>
             <p><strong>${t.health}:</strong> <span style="color:${color}">${score}</span></p>
            <p><strong>${t.status}:</strong> ${data.health.status}</p>
            <p><strong>${t.weather}:</strong></p>
            <p>🌡 ${Math.round(data.weather.temperature)}°C</p>
            <p>💧 ${data.weather.humidity}%</p>
            <hr>
            <p><strong>${t.ai}:</strong></p>
            <div id="aiText-${name}"></div>
        `;
        const aiElement = document.getElementById(`aiText-${name}`);
        const formatted = formatAIResponse(data.ai_insights);
        typeHTML(aiElement, formatted);
    } catch (err) {
        hideLoader();
        console.error("❌ Fetch error:", err);
    }
}

async function askAI() {
    const question = document.getElementById("ai-question").value.trim();
    if (!question) {
        alert("Please enter a question");
        return;
    }

    const resultDiv = document.getElementById("ai-chat-result");
    resultDiv.innerHTML = "<p>Thinking...</p>";

    try {
        const response = await fetch(`${API_URL}/talk`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question, lang: currentLang })
        });
        const data = await response.json();
        if (data.error) {
            resultDiv.innerHTML = `<p style='color: red;'>&#x274C; ${data.error}</p>`;
            return;
        }
        resultDiv.innerHTML = `<p><strong>Q:</strong> ${question}</p><p><strong>A:</strong> ${data.answer}</p>`;
    } catch (err) {
        resultDiv.innerHTML = `<p style='color:red;'>Failed to get AI response</p>`;
        console.error(err);
    }
}

async function getRecommendation() {
    const city = document.getElementById("recommend-city").value.trim();
    const season = document.getElementById("recommend-season").value;
    const plantType = document.getElementById("recommend-type").value;
    const resultDiv = document.getElementById("recommendation-result");

    if (!city) {
        resultDiv.innerHTML = `<p style='color:yellow;'>${translations[currentLang].recommendPlaceholder}</p>`;
        return;
    }

    resultDiv.innerHTML = `<p>Loading...</p>`;
    try {
        const query = new URLSearchParams({ city, season, plant_type: plantType }).toString();
        const resp = await fetch(`${API_URL}/recommend?${query}`);
        const data = await resp.json();
        if (data.error) {
            resultDiv.innerHTML = `<p style='color:red;'>${data.error}</p>`;
            return;
        }

        const recs = data.recommendations || [];
        resultDiv.innerHTML = `
            <p><strong>${translations[currentLang].seasonLabel}:</strong> ${data.season}</p>
            <p><strong>Weather:</strong> ${Math.round(data.weather.temperature)}°C, ${data.weather.humidity}% humidity, ${data.weather.description}</p>
            <ul>${recs.map(r => `<li>${r}</li>`).join("")}</ul>
        `;
    } catch (err) {
        resultDiv.innerHTML = `<p style='color:red;'>Failed to fetch recommendations</p>`;
        console.error(err);
    }
}

async function diagnosePlant() {
    const name = document.getElementById("diagnose-name").value;
    const fileInput = document.getElementById("image-file");
    if (!fileInput.files.length) {
        alert("Please select an image");
        return;
    }
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const resultDiv = document.getElementById("diagnosis-result");
    showLoader("diagnosis-result");
    try {
        const response = await fetch(`${API_URL}/plant/${name}/diagnose?lang=${currentLang}`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        console.log(data);
        hideLoader();
        if (data.error) {
            resultDiv.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
            return;
        }
        resultDiv.innerHTML = `
            <h3>🌿 ${name}</h3>
            <p><strong>Disease:</strong> ${data.disease}</p>
            <p><strong>AI Advice:</strong></p>
            <div id="aiText"></div>
        `;
        const aiElement = document.getElementById("aiText");
        const formatted = formatAIResponse(data.ai_advice || data.ai_insights);
        typeHTML(aiElement, formatted);
    } catch (err) {
        hideLoader();
        resultDiv.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
    }
}

function renderWateringHistory(logs) {
    if (!logs || logs.length === 0) {
        return `<p style="opacity:0.75; font-size:0.9rem;">No watering history available.</p>`;
    }
    const entries = logs
        .filter(log => log.action === "watering")
        .slice(-5)
        .reverse()
        .map(log => {
            const stageLabel = log.data.stage ? (translations[currentLang].growthStages[log.data.stage] || log.data.stage) : "n/a";
            return `
            <li>${new Date(log.timestamp).toLocaleString()} - ${log.data.amount} ${log.data.unit} (stage: ${stageLabel})</li>
        `;
        })
        .join("");
    return `<ul style="margin: 4px 0 10px 0; padding-left: 18px;">${entries}</ul>`;
}

function createWaterLogger(name) {
    return `
        <div class="water-log">
            <h4>${translations[currentLang].addWater}</h4>
            <input type="number" step="0.1" id="water-amount-${name}" placeholder="Amount (liters)" min="0" />
            <button onclick="waterPlant('${name}')">${translations[currentLang].addWater}</button>
        </div>
    `;
}

async function waterPlant(name) {
    const amount = parseFloat(document.getElementById(`water-amount-${name}`).value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a positive water amount");
        return;
    }
    try {
        const response = await fetch(`${API_URL}/plant/${name}/watering?amount=${amount}`, {
            method: "POST"
        });
        const data = await response.json();
        if (data.error) {
            alert(`❌ ${data.error}`);
            return;
        }
        localStorage.setItem(`water-${name}`, new Date().toISOString());
        alert(`✅ Water log added: ${amount} liters`);
        loadPlants();
    } catch (err) {
        alert("❌ Failed to log water");
        console.error(err);
    }
}

async function updateGrowthStage(name) {
    const newStage = document.getElementById(`growth-stage-${name}`).value;
    try {
        const response = await fetch(`${API_URL}/plant/${name}/growth?stage=${newStage}`, {
            method: "PUT"
        });
        const data = await response.json();
        if (data.error) {
            alert(`❌ ${data.error}`);
            return;
        }
        alert(`✅ ${translations[currentLang].updateStage} to ${newStage}`);
        loadPlants();
    } catch (err) {
        alert("❌ Failed to update growth stage");
        console.error(err);
    }
}

function checkWaterReminder(name) {
    const lastWater = localStorage.getItem(`water-${name}`);

    if (!lastWater) {
        console.warn(`No water reminder for ${name}`);
        return;
    }

    const lastTime = new Date(lastWater);
    const now = new Date();

    const diffHours = (now - lastTime) / (1000 * 60 * 60);

    if (diffHours > 24) {
        alert(`⚠️ ${name} needs water! It's been over 24 hours.`);
    }
}

window.addEventListener("load", () => {
    createLanguageToggle();
    applyTranslations();
    loadPlants();
});