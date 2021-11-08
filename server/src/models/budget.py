from typing import Optional
from .mongo_db_model import MongoDBModel


class Budget(MongoDBModel):
    month: int
    year: int
    value: float
    spent: float


class UpdateBudgetModel(MongoDBModel):
    month: Optional[int]
    year: Optional[int]
    value: Optional[float]
    spent: Optional[float]
