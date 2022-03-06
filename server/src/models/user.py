from datetime import date

from .mongo_db_model import MongoDBModel
from .category import Category
from typing import Optional, List

default_expense_categories = [
    Category(**{"name": "Housing", "color": "blue"}),
    Category(**{"name": "Transportation", "color": "orange"}),
    Category(**{"name": "Food", "color": "green"}),
    Category(**{"name": "Entertainment", "color": "red"}),
    Category(**{"name": "Other", "color": "grey"}),
]
default_income_categories = [
    Category(**{"name": "Exployment", "color": "blue"}),
    Category(**{"name": "Business", "color": "orange"}),
    Category(**{"name": "Investment", "color": "green"}),
    Category(**{"name": "Scholarships", "color": "red"}),
    Category(**{"name": "Other", "color": "grey"}),
]


class User(MongoDBModel):
    email: str
    hashed_password: Optional[str]
    active: Optional[bool] = None
    expense_categories_list: List[Category] = default_expense_categories
    income_categories_list: List[Category] = default_income_categories
    plaid_access_token: Optional[str] = None
    plaid_last_fetch: Optional[date] = None
