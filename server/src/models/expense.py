from typing import Optional
from datetime import date
from .mongo_db_model import MongoDBModel


class Expense(MongoDBModel):
    name: str
    description: Optional[str] = None
    date: date
    price: float
    currency: str
    exchange_rate: float
    location: Optional[str] = None
    location_x: Optional[float] = None
    location_y: Optional[float] = None
    category: str
    sub_category: Optional[str] = None
