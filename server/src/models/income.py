from typing import Optional
from datetime import date
from .mongo_db_model import MongoDBModel
from pydantic import validator


class Income(MongoDBModel):
    name: str
    description: Optional[str] = None
    date: date
    amount: float
    currency: str
    exchange_rate: float
    location: Optional[str] = None
    location_x: Optional[float] = None
    location_y: Optional[float] = None
    category: Optional[str] = None

    @validator("exchange_rate")
    def must_not_be_equal_negative_one(cls, exr):
        if exr == -1:
            raise ValueError("invalid currency")
        return exr


class UpdateIncomeModel(MongoDBModel):
    name: Optional[str]
    description: Optional[str]
    date: Optional[date]
    amount: Optional[float]
    currency: Optional[str]
    exchange_rate: Optional[float]
    location: Optional[str]
    location_x: Optional[float]
    location_y: Optional[float]
    category: Optional[str]

    @validator("exchange_rate")
    def must_not_be_equal_negative_one(cls, exr):
        if exr is not None and exr == -1:
            raise ValueError("invalid currency")
        return exr

    class Config:
        validate_assignment = True


class AddIncome(MongoDBModel):
    name: str
    description: Optional[str] = None
    date: date
    amount: float
    currency: str
    exchange_rate: Optional[float] = None
    location: Optional[str] = None
    location_x: Optional[float] = None
    location_y: Optional[float] = None
    category: Optional[str] = None
