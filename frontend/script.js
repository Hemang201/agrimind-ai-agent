const API_URL = "http://127.0.0.1:8000";

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
            <button onclick="getAnalytics('${plant.name}')">Analytics</button>
            <button onclick="getWatering('${plant.name}')">Watering</button>
            <div id="result-${plant.name}"></div>
        `;

        container.appendChild(card);
    });
}

async function getAnalytics(name) {
    const response = await fetch(`${API_URL}/plant/${name}/analytics`);
    const data = await response.json();
    const div = document.getElementById(`result-${name}`);
    div.innerHTML = `
        <p><strong>Health Score:</strong> ${data.health.health_score}</p>
        <p><strong>Alerts:</strong> ${data.alerts.join(", ")}</p>
    `;
}

async function getWatering(name) {
    const response = await fetch(`${API_URL}/plant/${name}/watering`);
    const data = await response.json();
    const div = document.getElementById(`result-${name}`);
    div.innerHTML = `
        <p><strong>Water:</strong> ${data.watering_plan.recommended_water_liters} L</p>
        <p><strong>Reason:</strong> ${data.watering_plan.reason.join(", ")}</p>
    `;
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
    alert("Analyzing image...");
    const response = await fetch(`${API_URL}/plant/${name}/diagnose`, {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    if (data.error) {
        alert(data.error);
        return;
    }
    alert(
        `Issue: ${data.diagnosis.issue}\n` +
        `Confidence: ${data.diagnosis.confidence}\n` +
        `Explanation: ${data.diagnosis.explanation}\n` +
        `Treatment: ${data.diagnosis.treatment}`
    );
    loadPlants();
}

loadPlants();