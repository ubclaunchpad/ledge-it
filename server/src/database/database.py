from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection


class Connect(object):
    @staticmethod
    def get_connection():
        return MongoClient(
            "mongodb+srv://dev-user:dev-user@moneymanagerdev.m0xh2.mongodb.net/money_manager_dev?retryWrites=true&w=majority"
        )


connection: MongoClient = Connect.get_connection()

db: Database = connection.money_manager_dev
user_collection: Collection = db.users
expense_collection: Collection = db.expenses
