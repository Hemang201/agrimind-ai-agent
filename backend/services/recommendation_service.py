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

SOIL_BASED_ADJUSTMENTS = {
    "sandy": ["Carrot", "Potato", "Radish"],
    "clay": ["Broccoli", "Cabbage", "Aster"],
    "loamy": ["Tomato", "Wheat", "Sugarcane"]
}


# Define which category each adjustment crop belongs to
CROP_CATEGORIES = {
    "Spinach": "vegetables", "Carrot": "vegetables", "Broccoli": "vegetables", "Garlic": "vegetables", "Peas": "vegetables",
    "Marigold": "flowers", "Chrysanthemum": "flowers", "Rose": "flowers", "Dahlia": "flowers", "Petunia": "flowers",
    "Mustard": "cashcrops", "Wheat": "cashcrops", "Potato": "cashcrops",
    "Lettuce": "vegetables", "Tomato": "vegetables", "Cucumber": "vegetables", "Radish": "vegetables", "Cauliflower": "vegetables",
    "Sunflower": "flowers", "Jasmine": "flowers", "Zinnia": "flowers", "Narcissus": "flowers",
    "Cotton": "cashcrops", "Soybean": "cashcrops", "Sugarcane": "cashcrops",
    "Okra": "vegetables", "Corn": "vegetables", "Sweet Potato": "vegetables", "Chilli": "vegetables", "Basil": "vegetables",
    "Hibiscus": "flowers", "Bougainvillea": "flowers", "Tulip": "flowers",
    "Sorghum": "cashcrops", "Pearl Millet": "cashcrops", "Groundnut": "cashcrops",
    "Beetroot": "vegetables", "Pumpkin": "vegetables", "Onion": "vegetables", "Chard": "vegetables", "Parsley": "vegetables",
    "Aster": "flowers",
    "Maize": "cashcrops", "Sesame": "cashcrops",
    "Eggplant": "vegetables", "Kale": "vegetables", "Bamboo": "vegetables", "Taro": "vegetables", "Ginger": "vegetables",
    "Cactus": "flowers", "Millet": "cashcrops", "Sorrel": "vegetables", "Cabbage": "vegetables"
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


def recommend_crops(city: str, weather: dict, season: str = None, plant_type: str = None, soil_type: str = None):
    if not season:
        season = get_season_from_month(datetime.utcnow().month)

    season_data = CROP_DATABASE.get(season, {})
    
    # Base list: if plant_type is specific, start with that. If not, start with all.
    if plant_type and plant_type in season_data:
        recommended = list(season_data[plant_type])
    else:
        recommended = [c for cat in season_data.values() for c in cat]

    # Adjustments: we check weather and soil, but ONLY add if they match the requested plant_type
    temp = weather.get("temperature")
    humidity = weather.get("humidity")
    potential_additions = []

    if temp is not None:
        if temp > 28:
            potential_additions.extend(WEATHER_BASED_ADJUSTMENTS["high_temp"])
        elif temp < 12:
            potential_additions.extend(WEATHER_BASED_ADJUSTMENTS["low_temp"])

    if humidity is not None:
        if humidity > 70:
            potential_additions.extend(WEATHER_BASED_ADJUSTMENTS["humid"])
        elif humidity < 40:
            potential_additions.extend(WEATHER_BASED_ADJUSTMENTS["dry"])

    if soil_type:
        st = soil_type.lower()
        if "sand" in st:
            potential_additions.extend(SOIL_BASED_ADJUSTMENTS["sandy"])
        elif "clay" in st:
            potential_additions.extend(SOIL_BASED_ADJUSTMENTS["clay"])
        elif "loam" in st:
            potential_additions.extend(SOIL_BASED_ADJUSTMENTS["loamy"])

    # Filter potential additions by plant_type IF plant_type is specified
    for crop in potential_additions:
        crop_cat = CROP_CATEGORIES.get(crop)
        # Fallback: if crop_cat is not found, we could try to infer it from CROP_DATABASE 
        # but for now, we only filter if plant_type is actually set.
        if not plant_type or plant_type == "" or crop_cat == plant_type:
            recommended.append(crop)

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
