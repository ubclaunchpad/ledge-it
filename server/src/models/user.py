from datetime import date

from .mongo_db_model import MongoDBModel
from .category import Category
from typing import Optional, List

default_expense_categories = [
    Category(**{"name": "Housing", "color": "#92CEEF"}),
    Category(**{"name": "Transportation", "color": "#EEC26C"}),
    Category(**{"name": "Food", "color": "#A2D181"}),
    Category(**{"name": "Entertainment", "color": "#EF857D"}),
    Category(**{"name": "Other", "color": "#A5A7EA"}),
]
default_income_categories = [
    Category(**{"name": "Exployment", "color": "#92CEEF"}),
    Category(**{"name": "Business", "color": "#EEC26C"}),
    Category(**{"name": "Investment", "color": "#A2D181"}),
    Category(**{"name": "Scholarships", "color": "#EF857D"}),
    Category(**{"name": "Other", "color": "#A5A7EA"}),
]


class User(MongoDBModel):
    email: str
    hashed_password: Optional[str]
    active: Optional[bool] = None
    expense_categories_list: List[Category] = default_expense_categories
    income_categories_list: List[Category] = default_income_categories
    plaid_access_token: Optional[str] = None
    plaid_last_fetch: Optional[date] = None
