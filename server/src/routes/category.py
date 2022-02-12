from fastapi import APIRouter, HTTPException, Depends, Body
from ..models import User, UpdateUserModel, Category
from typing import List
from ..middleware import get_current_active_user, get_current_user, pwd_context
from ..database import user_collection

# from ..database import category_collection

router = APIRouter()


@router.get(
    "/expense_categories",
    response_description="Get user's expense categories",
)
async def get_current_user_expense_categories(
    current_user: User = Depends(get_current_active_user),
):
    current_user_expense_categories = current_user.expense_categories_list
    if current_user_expense_categories is not None:
        return current_user_expense_categories
    raise HTTPException(
        status_code=404, detail=f"Categories for current user not found"
    )


# async def get_current_user_expense_categories():
#     data = {
#         "_id": "61fedf8e1986effc5354b6c5",
#         "created_at": "2022-02-05T19:56:27.942804",
#         "updated_at": "2022-02-05T19:56:27.942854",
#         "email": "gregork@ubc.com",
#         "hashed_password": pwd_context.hash("gregor"),
#         "active": True,
#         "expense_categories_list": [
#             {
#                 "_id": "71fedf8e1986effc5354b6c5",
#                 "created_at": "2022-02-05T17:46:14.543981",
#                 "updated_at": "2022-02-05T17:46:14.543981",
#                 "name": "Housing",
#                 "color": "blue",
#             },
#             {
#                 "_id": "81fedf8e1986effc5354b6c5",
#                 "created_at": "2022-02-05T17:46:14.543981",
#                 "updated_at": "2022-02-05T17:46:14.543981",
#                 "name": "Food",
#                 "color": "green",
#             },
#         ],
#         "income_categories_list": [
#             {
#                 "_id": "71fedf8e1986effc5354b6c5",
#                 "created_at": "2022-02-05T17:46:14.543981",
#                 "updated_at": "2022-02-05T17:46:14.543981",
#                 "name": "Salary",
#                 "color": "purple",
#             },
#         ],
#     }
#     current_user = User(**data)
#     if current_user is None:
#         raise HTTPException(status_code=404, detail=f"User not found")
#     current_user_expense_categories = current_user.expense_categories_list
#     if current_user_expense_categories is not None:
#         return current_user_expense_categories
#     else:
#         raise HTTPException(
#             status_code=404, detail=f"Categories for current user not found"
#         )


@router.delete(
    "/delete_expense_categories/{id}",
    response_description="Delete expense category",
)
async def delete_expense_categories_by_id(user_id: str, category_id: str):

    current_user: User = Depends(get_current_active_user)
    if current_user is None:
        raise HTTPException(status_code=404, detail=f"User not found")
    current_user_expense_categories = current_user.expense_categories_list
    if current_user_expense_categories is not None:
        user_collection.update_one(
            {"_id": user_id},
            {"$pull": {"current_user.expense_categories_list": {"_id": category_id}}},
        )
        # return current_user_expense_categories
        return get_current_user_expense_categories()  # TODO: Test this
    else:
        raise HTTPException(
            status_code=404, detail=f"Categories for current user not found"
        )


# @router.delete(
#     "/delete_expense_categories/{id}",
#     response_description="Delete expense category",
# )
# async def delete_expense_categories_by_id(user_id: str, category_id: str):
#     data = {
#         "_id": "61fedf8e1986effc5354b6c5",
#         "created_at": "2022-02-05T19:56:27.942804",
#         "updated_at": "2022-02-05T19:56:27.942854",
#         "email": "gregork@ubc.com",
#         "hashed_password": pwd_context.hash("gregor"),
#         "active": True,
#         "expense_categories_list": [
#             {
#                 "_id": "61fedf8e1986effc5354b6c5",
#                 "created_at": "2022-02-05T17:46:14.543981",
#                 "updated_at": "2022-02-05T17:46:14.543981",
#                 "name": "Housing",
#                 "color": "blue",
#             },
#             {
#                 "_id": "81fedf8e1986effc5354b6c5",
#                 "created_at": "2022-02-05T17:46:14.543981",
#                 "updated_at": "2022-02-05T17:46:14.543981",
#                 "name": "Food",
#                 "color": "green",
#             },
#         ],
#         "income_categories_list": [
#             {
#                 "_id": "71fedf8e1986effc5354b6c5",
#                 "created_at": "2022-02-05T17:46:14.543981",
#                 "updated_at": "2022-02-05T17:46:14.543981",
#                 "name": "Salary",
#                 "color": "purple",
#             },
#         ],
#     }
#     current_user = User(**data)
#     if current_user is None:
#         raise HTTPException(status_code=404, detail=f"User not found")
#     current_user_expense_categories = current_user.expense_categories_list
#     if current_user_expense_categories is not None:
#         user_collection.update_one(
#             {"_id": user_id},
#             {"$pull": {"current_user.expense_categories_list": {"_id": category_id}}},
#         )
#         return current_user_expense_categories
#     else:
#         raise HTTPException(
#             status_code=404, detail=f"Categories for current user not found"
#         )


@router.get(
    "/income_categories",
    response_description="Get user's income categories",
)
async def get_current_user_income_categories(
    current_user: User = Depends(get_current_active_user),
):
    if current_user is None:
        raise HTTPException(status_code=404, detail=f"User not found")
    current_user_income_categories = current_user.income_categories_list
    if current_user_income_categories is not None:
        return current_user_income_categories
    else:
        raise HTTPException(
            status_code=404, detail=f"Categories for current user not found"
        )


@router.delete(
    "/delete_income_categories/{id}",
    response_description="Delete income category",
)
async def delete_income_categories_by_id(user_id: str, category_id: str):
    current_user: User = Depends(get_current_active_user)
    if current_user is None:
        raise HTTPException(status_code=404, detail=f"User not found")
    current_user_income_categories = current_user.income_categories_list
    if current_user_income_categories is not None:
        user_collection.update_one(
            {"_id": user_id},
            {"$pull": {"current_user.income_categories_list": {"_id": category_id}}},
        )
        # return current_user_expense_categories
        return get_current_user_income_categories()  # TODO: Test this
    else:
        raise HTTPException(
            status_code=404, detail=f"Categories for current user not found"
        )
