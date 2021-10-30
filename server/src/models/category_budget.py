from typing import Optional
from datetime import date
from .mongo_db_model import MongoDBModel


class Category_Budget(MongoDBModel):
    month: int
    value: float
    spent: float
    category: str

