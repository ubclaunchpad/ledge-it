from datetime import date
from .mongo_db_model import MongoDBModel
from typing import List, Tuple
from datetime import date


class NetWorth(MongoDBModel):
    current: float
    all_time_expenses: float
    all_time_income: float
    history: list[
        dict
    ]  # History is list of [{date: date, value: networth}] -- NOT change in net worth.

    class Config:
        schema_extra = {
            "example": {
                "current": "100.00",
                "all_time_expenses": "250.00",
                "all_time_income": "350.00",
                "history": [
                    {"date": "2020-01-01", "value": "120.00"},
                    {"date": "2020-01-02", "value": "140.00"},
                ],
            }
        }
