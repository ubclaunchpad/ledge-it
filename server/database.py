"""
Author: Mathew Bushuru
Function: Connects backend of our app to our MongoDB database (money_manager_dev)
"""
from pymongo import MongoClient
import pprint

from src.models.user import User


class Connect(object):
    @staticmethod
    def get_connection():
        return MongoClient(
            "mongodb+srv://dev-user:dev-user@moneymanagerdev.m0xh2.mongodb.net/money_manager_dev?retryWrites=true&w=majority"
        )


connection = Connect.get_connection()
# print(connection
db = connection.money_manager_dev
user_collection = db.users

# create dummy user
data = {
    "username": "Test User1",
    "email": "testuser1@moneymanager.com",
    "password": "abcde123",
    "confirm_password": "abcde123",
    "timestamp": "2021-10-28 19:15",
}
user = User(**data).dict()

# Insert single user
result = user_collection.insert_one(user)
print(result.inserted_id)

# Print all users
user_list = user_collection.find()
pp = pprint.PrettyPrinter(indent=4)
for doc in user_list:
    pp.pprint(doc)
