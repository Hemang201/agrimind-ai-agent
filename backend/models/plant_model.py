from typing import List, Dict
from datetime import datetime

class Plant:
    def __init__(self, name: str, plant_type: str, city: str):
        self.name = name
        self.plant_type = plant_type
        self.city = city
        self.created_at = datetime.utcnow().isoformat()
        self.logs: List[Dict] = []
        self.growth_stage = "seed"

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
            "created_at": self.created_at,
            "growth_stage": self.growth_stage,
            "logs": self.logs
        }