from typing import Optional, List
from datetime import date
from .mongo_db_model import MongoDBModel


class Budget(MongoDBModel):
    month: int
    value: float
    spent: float
