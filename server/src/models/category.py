from typing import List
from .mongo_db_model import MongoDBModel


class Category(MongoDBModel):
    name: str
