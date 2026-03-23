from datetime import datetime

CROP_DATABASE = {
    "winter": {
        "vegetables": ["Spinach", "Carrot", "Broccoli", "Garlic", "Peas"],
        "flowers": ["Marigold", "Chrysanthemum", "Rose", "Dahlia", "Petunia"],
        "cashcrops": ["Mustard", "Wheat", "Potato"]
    },
    "spring": {
        "vegetables": ["Lettuce", "Tomato", "Cucumber", "Radish", "Cauliflower"],
        "flowers": ["Sunflower", "Jasmine", "Zinnia", "Narcissus"],
        "cashcrops": ["Cotton", "Soybean", "Sugarcane"]
    },
    "summer": {
        "vegetables": ["Okra", "Corn", "Sweet Potato", "Chilli", "Basil"],
        "flowers": ["Hibiscus", "Bougainvillea", "Tulip"],
        "cashcrops": ["Sorghum", "Pearl Millet", "Groundnut"]
    },
    "autumn": {
        "vegetables": ["Beetroot", "Pumpkin", "Onion", "Chard", "Parsley"],
        "flowers": ["Marigold", "Aster", "Dahlia"],
        "cashcrops": ["Maize", "Sunflower", "Sesame"]
    }
}

WEATHER_BASED_ADJUSTMENTS = {
    "high_temp": ["Okra", "Sorghum", "Eggplant"],
    "low_temp": ["Peas", "Spinach", "Kale"],
    "humid": ["Bamboo", "Taro", "Ginger"],
    "dry": ["Cactus", "Millet", "Sorrel"]
}


def get_season_from_month(month: int):
    if month in [12, 1, 2]:
        return "winter"
    elif month in [3, 4, 5]:
        return "spring"
    elif month in [6, 7, 8]:
        return "summer"
    else:
        return "autumn"


def recommend_crops(city: str, weather: dict, season: str = None, plant_type: str = None):
    if not season:
        season = get_season_from_month(datetime.utcnow().month)

    season_data = CROP_DATABASE.get(season, {})
    if plant_type and plant_type in season_data:
        base_recommendations = season_data[plant_type]
    else:
        # flatten all categories if no plant_type specified or invalid
        base_recommendations = [c for cat in season_data.values() for c in cat]

    recommended = list(base_recommendations)

    temp = weather.get("temperature")
    humidity = weather.get("humidity")

    if temp is not None:
        if temp > 28:
            recommended.extend(WEATHER_BASED_ADJUSTMENTS["high_temp"])
        elif temp < 12:
            recommended.extend(WEATHER_BASED_ADJUSTMENTS["low_temp"])

    if humidity is not None:
        if humidity > 70:
            recommended.extend(WEATHER_BASED_ADJUSTMENTS["humid"])
        elif humidity < 40:
            recommended.extend(WEATHER_BASED_ADJUSTMENTS["dry"])

    # De-duplicate and maintain order
    seen = set()
    final = []
    for c in recommended:
        if c not in seen:
            seen.add(c)
            final.append(c)

    return {
        "city": city,
        "season": season,
        "weather": weather,
        "recommendations": final[:10]
    }
