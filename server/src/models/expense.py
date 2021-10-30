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


class UpdateExpenseModel(MongoDBModel):
    name: Optional[str]
    description: Optional[str]
    date: Optional[date]
    price: Optional[float]
    currency: Optional[str]
    exchange_rate: Optional[float]
    location: Optional[str]
    location_x: Optional[float]
    location_y: Optional[float]
    category: Optional[str]
    sub_category: Optional[str]
