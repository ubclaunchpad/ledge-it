from pydantic import validator
from .mongo_db_model import MongoDBModel
from typing import Optional


class User(MongoDBModel):
    email: str
    hashed_password: Optional[str]
    active: Optional[bool] = None
