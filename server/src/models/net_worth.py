from typing import Optional
from datetime import date
from .mongo_db_model import MongoDBModel

class NetWorth(MongoDBModel):
    current: float
    history: dict[date, float]
