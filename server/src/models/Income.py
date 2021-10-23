from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional
from datetime import date


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# included location as x y coordinates
# date = today date
# currency_exchange = x -> CAD
class Income(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    description: Optional[str] = None
    date: date
    amount: float
    currency: str
    exchange_rate: float
    location: Optional[str] = None
    locationx: Optional[float] = None
    loacationy: Optional[float] = None
    category: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
