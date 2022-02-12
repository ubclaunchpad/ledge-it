from typing import List, Optional
from .mongo_db_model import MongoDBModel


class Category(MongoDBModel):
    name: str
    color: str
