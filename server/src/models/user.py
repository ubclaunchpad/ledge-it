from .mongo_db_model import MongoDBModel
from .category import Category
from typing import Optional, List


class User(MongoDBModel):
    email: str
    hashed_password: Optional[str]
    active: Optional[bool] = None
    expense_categories_list: List[Category] = None
    income_categories_list: List[Category] = None


class UpdateUserModel(MongoDBModel):
    email: Optional[str]
    hashed_password: Optional[str]
    active: Optional[bool] = None
    expense_categories_list: Optional[List[Category]] = None
    income_categories_list: Optional[List[Category]] = None
