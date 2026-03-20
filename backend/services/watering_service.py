def calculate_watering(temperature: float, humidity: float, rain: float):
    base_water_liters = 1.0

    reason = []

    # Temperature logic
    if temperature > 35:
        base_water_liters *= 1.3
        reason.append("High temperature detected")
    elif temperature < 35 and temperature > 20:
        base_water_liters *= 1.0
        reason.append("Morderate temperature detected")
    elif temperature < 20:
        base_water_liters *= 0.8
        reason.append("Low temperature detected")

    # Humidity logic
    if humidity < 40:
        base_water_liters *= 1.2
        reason.append("Low humidity increases evaporation")
    elif humidity > 80:
        base_water_liters *= 0.8
        reason.append("High humidity reduces water need")

    # Rain logic
    if rain > 0:
        base_water_liters = 0
        reason.append("Rain detected, skipping watering")

    return {
        "recommended_water_liters": round(base_water_liters, 2),
        "reason": reason
    }