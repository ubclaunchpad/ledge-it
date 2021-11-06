from datetime import date
from .mongo_db_model import MongoDBModel


class NetWorth(MongoDBModel):
    current: float
    history: dict[date, float]

    class Config:
        schema_extra = {
            "example": {"current": "100.00", "history": {"2020-01-01": "120.00"}}
        }


class UpdateNetWorthModel(MongoDBModel):
    value: float

    class Config:
        schema_extra = {"example": {"value": "101.99"}}
