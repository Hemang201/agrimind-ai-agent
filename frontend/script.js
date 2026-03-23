const API_URL = "http://127.0.0.1:8000";

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
    data.plants.forEach(plant => {
        const card = document.createElement("div");
        card.className = "plant-card";
        card.innerHTML = `
            <h3>${plant.name}</h3>
            <p><strong>Type:</strong> ${plant.plant_type}</p>
            <p><strong>City:</strong> ${plant.city}</p>
            <p><strong>Stage:</strong> ${plant.growth_stage}</p>
            <button onclick="handleAnalytics('${plant.name}')">Analytics</button>
            <div id="result-${plant.name}"></div>
        `;
        container.appendChild(card);
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
        div.innerHTML = ""; // hide if already open
        return;
    }
    console.log("Fetching:", name);
    showLoader(`result-${name}`);
    try {
        const response = await fetch(`http://127.0.0.1:8000/plant/${name}/analytics`);
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
        div.innerHTML = `
            <h3>🌿 ${name}</h3>
            <p><strong>Health:</strong> ${data.health.score}/100</p>
            <p><strong>Status:</strong> ${data.health.status}</p>
            <p><strong>Weather:</strong></p>
            <p>🌡 ${Math.round(data.weather.temperature)}°C</p>
            <p>💧 ${data.weather.humidity}%</p>
            <hr>
            <p><strong>AI Insights:</strong></p>
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

function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
    };
    recognition.onerror = function() {
        alert("Voice recognition failed");
    };
}

function handleVoiceCommand(command) {
    alert("Command: " + command);
    if (command.includes("add plant")) {
        alert("Please enter details manually for now");
    }
    else if (command.includes("show plants")) {
        loadPlants();
    }
    else if (command.includes("dashboard")) {
        loadPlants();
    }
    else {
        alert("Command not recognized");
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
        const response = await fetch(`${API_URL}/plant/${name}/diagnose`, {
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

loadPlants();