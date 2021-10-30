from pymongo import MongoClient
import pprint
import requests
import json

class Connect(object):
    @staticmethod
    def get_connection():
        return MongoClient(
            "mongodb+srv://dev-user:dev-user@moneymanagerdev.m0xh2.mongodb.net/money_manager_dev?retryWrites=true&w=majority"
        )


def add_budget():
    # Set up connection to database
    connection = Connect.get_connection()

    db = connection.money_manager_dev
    budget_collection = db.budgets

    # Request for user input
    budget_month = input("Please enter month: ")
    budget_amount = input("Please enter budget amount: ")

    print("Hi #4")
    # Set template object
    budget_obj = {"month": budget_month, "value": budget_amount, "spent": 0}

    print("Hi #5")
    # Insert budget to database
    res = budget_collection.insert_one(budget_obj)
    print(res.inserted_id)
    print("Hi #6")

add_budget()

# # How to identify the unique budget??? Is this for each customer??

def update_budget():

    # Set up connection to database
    connection = Connect.get_connection()

    db = connection.money_manager_dev
    budget_collection = db.budgets

    # Request for user input
    budget_target_month = input("Please enter the month to change: ")
    budget_amount_new = input("Please enter new value: ")

    # Set template object
    filter = {"month": budget_target_month}
    update = {"$set": {"value": budget_amount_new}}

    # Insert budget to database
    res = budget_collection.update_one(filter, update)
    print(res.inserted_id)

def add_category_budget():
    # Set up connection to database
    connection = Connect.get_connection()

    db = connection.money_manager_dev
    budgetc_collection = db.budgets_category

    # Request for user input
    budgetc_month = input("Please enter month: ")
    budgetc_amount = input("Please enter budget amount: ")
    budgetc_category = input("Please enter category: ")

    # Set template object
    budgetc_obj = {"month": budgetc_month, "value": budgetc_amount, "spent": 0, "category": budgetc_category}

    # Insert budget to database
    res = budgetc_collection.insert_one(budgetc_obj)
    print(res.inserted_id)

def update_category_budget():

    # Set up connection to database
    connection = Connect.get_connection()

    db = connection.money_manager_dev
    budgetc_collection = db.budgets_category

    # Request for user input
    budgetc_target_month = input("Please enter the month to change: ")
    budgetc_amount_new = input("Please enter new value: ")

    # Set template object
    filter = {"month": budgetc_target_month}
    update = {"$set": {"value": budgetc_amount_new}}

    # Insert budget to database
    res = budgetc_collection.update_one(filter, update)
    print(res.inserted_id)

