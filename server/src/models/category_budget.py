from typing import Optional
from .mongo_db_model import MongoDBModel


class CategoryBudget(MongoDBModel):
    month: int
    year: int
    value: float
    spent: float
    category: str


class UpdateCategoryBudgetModel(MongoDBModel):
    month: Optional[int]
    year: Optional[int]
    value: Optional[float]
    spent: Optional[float]
    category: Optional[str]
