from unicodedata import category
from pydantic import validator
from .mongo_db_model import MongoDBModel
from .category import Category
from typing import Optional, List


class User(MongoDBModel):
    email: str
    hashed_password: Optional[str]
    active: Optional[bool] = None
    expense_categories_list: List[Category] = None
    income_categories_list: List[Category] = None
