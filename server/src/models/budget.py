from typing import Optional, List
from datetime import date
from .mongo_db_model import MongoDBModel


class Budget(MongoDBModel):
    month: int
    value: float
    spent: float


class UpdateBudgetModel(MongoDBModel):
    month: Optional[int]
    value: Optional[float]
    spent: Optional[float]
