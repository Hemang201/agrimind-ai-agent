def generate_alerts(plant: dict, weather: dict):
    alerts = []

    temp = weather["temperature"]
    humidity = weather["humidity"]
    rain = weather["rain"]

    # Temperature alerts
    if temp > 38:
        alerts.append("High temperature risk — increase watering")

    if temp < 10:
        alerts.append("Low temperature risk — possible plant stress")

    # Humidity alerts
    if humidity < 30:
        alerts.append("Low humidity — plant may dry out faster")

    # Rain alerts
    if rain > 5:
        alerts.append("Heavy rain — avoid watering")

    # Check logs
    logs = plant.get("logs", [])
    if not logs:
        alerts.append("No activity recorded — monitor plant")

    return alerts