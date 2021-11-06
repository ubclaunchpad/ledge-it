from pydantic import validator
from .mongo_db_model import MongoDBModel
from typing import Optional


class User(MongoDBModel):
    username: str
    email: str
    active: Optional[bool] = None
    hashed_password: str
    password: str
    confirm_password: str  # To be used for data validation

    @validator("confirm_password")
    def passwords_match(cls, v, values, **kwargs):
        if "password" in values and v != values["password"]:
            raise ValueError("passwords do not match!")
        return v
