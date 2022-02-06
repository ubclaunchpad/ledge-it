from fastapi import APIRouter, HTTPException, Depends
from ..models import User
from typing import List
from ..middleware import get_current_active_user, get_current_user, pwd_context
from ..database import category_collection

router = APIRouter()


@router.get(
    "/income_categories",
    response_description="Get user's income categories",
)
async def get_current_user_income_categories(
    current_user: User = Depends(get_current_active_user),
):
    current_user_income_categories = current_user.income_categories_list
    if current_user_income_categories is not None:
        return current_user_income_categories
    raise HTTPException(
        status_code=404, detail=f"Categories for current user not found"
    )


@router.get(
    "/expense_categories",
    response_description="Get user's expense categories",
)
# async def get_current_user_expense_categories(current_user: User = Depends(get_current_active_user)):
#     current_user_expense_categories = current_user.expense_categories_list
#     if current_user_expense_categories is not None:
#         return current_user_expense_categories
#     raise HTTPException(
#         status_code=404, detail=f"Categories for current user not found"
#     )

# For some reason, i cant get user from db, using this function below instead for testing.
# If it works, use above function instead which makes sure user is logged in before making request
async def get_current_user_expense_categories():
    data = {
        "_id": "61fedf8e1986effc5354b6c5",
        "created_at": "2022-02-05T19:56:27.942804",
        "updated_at": "2022-02-05T19:56:27.942854",
        "email": "gregork@ubc.com",
        "hashed_password": pwd_context.hash("gregor"),
        "active": True,
        "expense_categories_list": [
            {
                "_id": "71fedf8e1986effc5354b6c5",
                "created_at": "2022-02-05T17:46:14.543981",
                "updated_at": "2022-02-05T17:46:14.543981",
                "name": "Housing",
                "subcategory": ["Rent", "House utilities"],
            },
            {
                "_id": "81fedf8e1986effc5354b6c5",
                "created_at": "2022-02-05T17:46:14.543981",
                "updated_at": "2022-02-05T17:46:14.543981",
                "name": "Food",
                "subcategory": ["Fast food", "Groceries"],
            },
        ],
        "income_categories_list": [
            {
                "_id": "71fedf8e1986effc5354b6c5",
                "created_at": "2022-02-05T17:46:14.543981",
                "updated_at": "2022-02-05T17:46:14.543981",
                "name": "Salary",
                "subcategory": ["Co-op", "Work learn"],
            },
        ],
    }
    current_user = User(**data)
    current_user_expense_categories = current_user.expense_categories_list
    if current_user_expense_categories is not None:
        return current_user_expense_categories
    raise HTTPException(
        status_code=404, detail=f"Categories for current user not found"
    )
