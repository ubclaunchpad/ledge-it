import json
from fastapi import APIRouter, HTTPException, Depends, Body
from fastapi.encoders import jsonable_encoder
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
    current_user_expense_categories = current_user["expense_categories_list"]
    if current_user_expense_categories is not None:
        return current_user_expense_categories
    raise HTTPException(
        status_code=404, detail=f"Categories for current user not found"
    )


@router.put(
    "/update_expense_category/",
    response_description="Update user's expense categories list by user id",
)
def add_expense_category(
    user_id: str,
    new_category: str,
    category_color: str,
    # updated_user: UpdateUserModel = Body(...),
):
    current_user: User = Depends(get_current_active_user)
    if current_user is None:
        raise HTTPException(status_code=404, detail=f"User not found")
    new_category_dict = {"name": new_category, "color": category_color}
    new_category = Category(**new_category_dict)
    new_category = jsonable_encoder(new_category)
    user_collection.update_one(
        {"_id": user_id},
        {"$push": {"expense_categories_list": new_category}},
    )


@router.delete(
    "/delete_expense_categories",
    response_description="Delete expense category",
)
async def delete_expense_categories_by_id(
    user_id: str,
    category_id: str,
    current_user: User = Depends(get_current_active_user),
):
    if current_user is None:
        raise HTTPException(status_code=404, detail=f"User not found")
    current_user_expense_categories = current_user.expense_categories_list
    if current_user_expense_categories is not None:
        user_collection.update_one(
            {"_id": user_id},
            {"$pull": {"expense_categories_list": {"_id": category_id}}},
        )
    else:
        raise HTTPException(
            status_code=404, detail=f"Categories for current user not found"
        )


@router.get(
    "/income_categories",
    response_description="Get user's income categories",
)
async def get_current_user_income_categories(
    current_user: User = Depends(get_current_active_user),
):
    if current_user is None:
        raise HTTPException(status_code=404, detail=f"User not found")
    current_user_income_categories = current_user["income_categories_list"]
    if current_user_income_categories is not None:
        return current_user_income_categories
    else:
        raise HTTPException(
            status_code=404, detail=f"Categories for current user not found"
        )


@router.delete(
    "/delete_income_categories",
    response_description="Delete income category",
)
async def delete_income_categories_by_id(
    user_id: str,
    category_id: str,
    current_user: User = Depends(get_current_active_user),
):
    if current_user is None:
        raise HTTPException(status_code=404, detail=f"User not found")
    current_user_expense_categories = current_user["income_categories_list"]
    if current_user_expense_categories is not None:
        user_collection.update_one(
            {"_id": user_id},
            {"$pull": {"income_categories_list": {"_id": category_id}}},
        )
    else:
        raise HTTPException(
            status_code=404, detail=f"Categories for current user not found"
        )


@router.put(
    "/update_income_category/",
    response_description="Update user's income categories list by user id",
)
def add_income_category(
    user_id: str,
    new_category: str,
    category_color: str,
    # updated_user: UpdateUserModel = Body(...),
):
    current_user: User = Depends(get_current_active_user)
    if current_user is None:
        raise HTTPException(status_code=404, detail=f"User not found")
    new_category_dict = {"name": new_category, "color": category_color}
    new_category = Category(**new_category_dict)
    new_category = jsonable_encoder(new_category)
    user_collection.update_one(
        {"_id": user_id},
        {"$push": {"income_categories_list": new_category}},
    )
