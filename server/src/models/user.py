from .mongo_db_model import MongoDBModel
from .category import Category
from typing import Optional, List

# default category list to just include other
other_category_dict = {"name": "Other", "color": "grey"}
other_category = Category(**other_category_dict)


class User(MongoDBModel):
    email: str
    hashed_password: Optional[str]
    active: Optional[bool] = None
    expense_categories_list: List[Category] = [other_category]
    income_categories_list: List[Category] = [other_category]


class UpdateUserModel(MongoDBModel):
    email: Optional[str]
    hashed_password: Optional[str]
    active: Optional[bool] = None
    expense_categories_list: Optional[List[Category]]
    income_categories_list: Optional[List[Category]]
