from .mongo_db_model import BaseMongoDBModel


class Category(BaseMongoDBModel):
    name: str
    color: str
