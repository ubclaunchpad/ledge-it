from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..models import User, Category
from ..middleware import get_current_active_user
from ..database import user_collection

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
    else:
        raise HTTPException(status_code=404, detail=f"No categories found.")


@router.put(
    "/expense_categories",
    response_description="Update user's expense categories list by user id",
)
def add_expense_category(
    category_name: str,
    category_color: str,
    current_user: User = Depends(get_current_active_user),
):
    if len(current_user["expense_categories_list"]) >= 10:
        raise HTTPException(status_code=400, detail=f"No more categories can be added.")
    new_category_dict = {"name": category_name, "color": category_color}
    new_category = Category(**new_category_dict)
    new_category = jsonable_encoder(new_category)
    if not any(
        category_name == c["name"] for c in current_user["expense_categories_list"]
    ):
        user_collection.update_one(
            {"email": current_user["email"]},
            {"$push": {"expense_categories_list": new_category}},
        )
        return JSONResponse(
            status_code=status.HTTP_200_OK, content="Category successfully added."
        )
    else:
        raise HTTPException(status_code=400, detail=f"Category already exists.")


@router.delete(
    "/expense_categories",
    response_description="Delete expense category",
)
async def delete_expense_categories_by_id(
    category_name: str,
    current_user: User = Depends(get_current_active_user),
):
    if category_name == "Other":
        raise HTTPException(status_code=400, detail=f"Cannot delete Other category.")
    current_user_expense_categories = current_user["expense_categories_list"]
    if current_user_expense_categories is not None:
        user_collection.update_one(
            {"email": current_user["email"]},
            {"$pull": {"expense_categories_list": {"name": category_name}}},
        )
    else:
        raise HTTPException(status_code=404, detail=f"No categories found.")


@router.get(
    "/income_categories",
    response_description="Get user's income categories",
)
async def get_current_user_income_categories(
    current_user: User = Depends(get_current_active_user),
):
    current_user_income_categories = current_user["income_categories_list"]
    if current_user_income_categories is not None:
        return current_user_income_categories
    else:
        raise HTTPException(status_code=404, detail=f"No categories found.")


@router.put(
    "/income_categories",
    response_description="Update user's income categories list by user id",
)
def add_income_category(
    category_name: str,
    category_color: str,
    current_user: User = Depends(get_current_active_user),
):
    if len(current_user["income_categories_list"]) >= 10:
        raise HTTPException(status_code=400, detail=f"No more categories can be added.")
    new_category_dict = {"name": category_name, "color": category_color}
    new_category = Category(**new_category_dict)
    new_category = jsonable_encoder(new_category)
    if not any(
        category_name == c["name"] for c in current_user["income_categories_list"]
    ):
        user_collection.update_one(
            {"email": current_user["email"]},
            {"$push": {"income_categories_list": new_category}},
        )
        return JSONResponse(
            status_code=status.HTTP_200_OK, content="Category successfully added."
        )
    else:
        raise HTTPException(status_code=400, detail=f"Category already exists.")


@router.delete(
    "/income_categories",
    response_description="Delete income category",
)
async def delete_income_categories_by_id(
    category_name: str,
    current_user: User = Depends(get_current_active_user),
):
    if category_name == "Other":
        raise HTTPException(status_code=400, detail=f"Cannot delete Other category.")
    current_user_expense_categories = current_user["income_categories_list"]
    if current_user_expense_categories is not None:
        user_collection.update_one(
            {"email": current_user["email"]},
            {"$pull": {"income_categories_list": {"name": category_name}}},
        )
    else:
        raise HTTPException(status_code=404, detail=f"No categories found.")
