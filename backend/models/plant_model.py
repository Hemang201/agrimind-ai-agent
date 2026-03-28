from typing import List, Dict
from datetime import datetime

class Plant:
    def __init__(self, name: str, plant_type: str, city: str, soil_type: str = "", soil_minerals: str = ""):
        self.name = name
        self.plant_type = plant_type
        self.city = city
        self.soil_type = soil_type
        self.soil_minerals = soil_minerals
        self.created_at = datetime.utcnow().isoformat()
        self.logs: List[Dict] = []
        self.growth_stage = "germination"

    def add_log(self, action: str, data: Dict):
        self.logs.append({
            "timestamp": datetime.utcnow().isoformat(),
            "action": action,
            "data": data
        })

    def update_growth_stage(self, stage: str):
        self.growth_stage = stage

    def to_dict(self):
        return {
            "name": self.name,
            "plant_type": self.plant_type,
            "city": self.city,
            "soil_type": getattr(self, "soil_type", ""),
            "soil_minerals": getattr(self, "soil_minerals", ""),
            "created_at": self.created_at,
            "growth_stage": self.growth_stage,
            "logs": self.logs
        }