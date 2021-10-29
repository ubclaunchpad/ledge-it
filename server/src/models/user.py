from datetime import datetime
from typing import Optional
from pydantic import ValidationError, validator

from .mongo_db_model import MongoDBModel


class User(MongoDBModel):
    username: str
    email: str
    password: str
    confirm_password: str  # To be used for data validation
    timestamp: Optional[
        datetime
    ] = None  # Was thinking we should record the time when the account is created

    @validator("confirm_password")
    def passwords_match(cls, v, values, **kwargs):
        if "password" in values and v != values["password"]:
            raise ValueError("passwords do not match!")
        return v
