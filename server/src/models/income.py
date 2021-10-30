from typing import Optional
from datetime import date
from .mongo_db_model import MongoDBModel


class Income(MongoDBModel):
    name: str
    description: Optional[str] = None
    date: date
    amount: float
    currency: str
    exchange_rate: float
    location: Optional[str] = None
    location_x: Optional[float] = None
    location_y: Optional[float] = None
    category: Optional[str] = None
