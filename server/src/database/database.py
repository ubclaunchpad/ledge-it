from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection

test_db_uri = "mongodb+srv://dev-user:dev-user@moneymanagerdev.m0xh2.mongodb.net/money_manager_dev?retryWrites=true&w=majority"
docker_db_uri = "mongodb://dev-user:dev-user@db:27017/?retryWrites=true&w=majority"


class Connect(object):
    @staticmethod
    def get_connection():
        return MongoClient(test_db_uri)


connection: MongoClient = Connect.get_connection()

db: Database = connection.money_manager_dev
user_collection: Collection = db.users
expense_collection: Collection = db.expenses
budget_collection: Collection = db.budgets
catbudget_collection: Collection = db.catbudgets
