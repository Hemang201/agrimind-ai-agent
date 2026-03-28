from typing import Dict
from backend.models.plant_model import Plant
from backend.utils.storage import save_data, load_data
from backend.services.soil_service import lookup_preset_soil

# In-memory storage
plants_db: Dict[str, Plant] = {}
loaded = load_data()

needs_save = False
for name, data in loaded.items():
    s_type = data.get("soil_type", "")
    s_minerals = data.get("soil_minerals", "")
    
    if not s_type or not s_minerals:
        preset = lookup_preset_soil(data.get("city", ""))
        s_type = preset["soil_type"]
        s_minerals = f"N: {preset['minerals']['n']}%, P: {preset['minerals']['p']}%, K: {preset['minerals']['k']}%, Moisture: {preset['moisture']}%"
        needs_save = True

    plant = Plant(
        data["name"], 
        data["plant_type"], 
        data["city"],
        s_type,
        s_minerals
    )
    plant.logs = data["logs"]
    plant.growth_stage = data["growth_stage"]
    plants_db[name] = plant

if needs_save:
    save_data({k: v.to_dict() for k, v in plants_db.items()})

def create_plant(name: str, plant_type: str, city: str, soil_type: str = "", soil_minerals: str = ""):
    plant = Plant(name, plant_type, city, soil_type, soil_minerals)
    plants_db[name] = plant
    save_data({k: v.to_dict() for k, v in plants_db.items()})
    return plant

def get_plant(name: str):
    return plants_db.get(name)

def get_all_plants():
    return [plant.to_dict() for plant in plants_db.values()]

def log_action(name: str, action: str, data: dict):
    plant = plants_db.get(name)
    if not plant:
        return None
    plant.add_log(action, data)
    save_data({k: v.to_dict() for k, v in plants_db.items()})
    return plant

def update_growth(name: str, stage: str):
    plant = plants_db.get(name)
    if not plant:
        return None
    plant.update_growth_stage(stage)
    save_data({k: v.to_dict() for k, v in plants_db.items()})
    return plant