from typing import Dict
from backend.models.plant_model import Plant

# In-memory storage
plants_db: Dict[str, Plant] = {}

def create_plant(name: str, plant_type: str, city: str):
    plant = Plant(name, plant_type, city)
    plants_db[name] = plant
    return plant
    if name in plants_db:
        return plants_db[name]

def get_plant(name: str):
    return plants_db.get(name)

def get_all_plants():
    return [plant.to_dict() for plant in plants_db.values()]

def log_action(name: str, action: str, data: dict):
    plant = plants_db.get(name)
    if not plant:
        return None
    plant.add_log(action, data)
    return plant

def update_growth(name: str, stage: str):
    plant = plants_db.get(name)
    if not plant:
        return None
    plant.update_growth_stage(stage)
    return plant