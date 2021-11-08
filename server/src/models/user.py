from pydantic import validator, Field
from .mongo_db_model import MongoDBModel


class User(MongoDBModel):
    username: str
    email: str
    password: str
    confirm_password: str  # To be used for data validation

    @validator("confirm_password")
    def passwords_match(cls, v, values, **kwargs):
        if "password" in values and v != values["password"]:
            raise ValueError("passwords do not match!")
        return v


class UserInDB(MongoDBModel):
    username: str
    email: str
    hashed_password: str
