def lookup_preset_soil(city: str):
    c = city.lower()
    if 'noida' in c or 'delhi' in c:
        return {"soil_type": "Loamy", "minerals": {"n": 70, "p": 40, "k": 50}, "moisture": 60}
    elif 'mumbai' in c or 'chennai' in c:
        return {"soil_type": "Sandy", "minerals": {"n": 40, "p": 30, "k": 80}, "moisture": 40}
    elif 'bangalore' in c or 'pune' in c:
        return {"soil_type": "Clay", "minerals": {"n": 50, "p": 60, "k": 40}, "moisture": 70}
    elif 'punjab' in c or 'haryana' in c:
        return {"soil_type": "Loamy", "minerals": {"n": 80, "p": 70, "k": 60}, "moisture": 60}
    else:
        return {"soil_type": "Loamy", "minerals": {"n": 50, "p": 50, "k": 50}, "moisture": 50}
