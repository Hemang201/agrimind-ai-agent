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
            <button onclick="getWatering('${plant.name}')">Watering Plan</button>
        `;

        container.appendChild(card);
    });
}

async function getAnalytics(name) {
    const response = await fetch(`${API_URL}/plant/${name}/analytics`);
    const data = await response.json();

    alert(
        `Health Score: ${data.health.health_score}\n` +
        `Alerts: ${data.alerts.join(", ")}`
    );
}

async function getWatering(name) {
    const response = await fetch(`${API_URL}/plant/${name}/watering`);
    const data = await response.json();

    alert(
        `Water: ${data.watering_plan.recommended_water_liters} L\n` +
        `Reason: ${data.watering_plan.reason.join(", ")}`
    );
}

loadPlants();