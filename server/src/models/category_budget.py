from typing import Optional
from datetime import date
from .mongo_db_model import MongoDBModel


class CategoryBudget(MongoDBModel):
    month: int
    value: float
    spent: float
    category: str

class UpdateCategoryBudgetModel(MongoDBModel):
    month: Optional[int]
    value: Optional[float]
    spent: Optional[float]
    category: Optional[str]