import pymongo
from fastapi import APIRouter, Body, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


from ..middleware import get_current_active_user
from ..models.user import User
from ..models import CategoryBudget, UpdateCategoryBudgetModel
from ..database import category_budget_collection
from typing import List

router = APIRouter()


@router.get(
    "/budget/category/all",
    response_description="Get all category budgets by month and year",
    response_model=List[CategoryBudget],
)
def get_all_category_budget(
    month: int, year: int, current_user: User = Depends(get_current_active_user)
):
    if (
        category_budgets := category_budget_collection.find(
            {"month": month, "year": year, "email": current_user["email"]}
        ).sort([("year", pymongo.DESCENDING), ("month", pymongo.DESCENDING)])
    ).count():
        return [
            jsonable_encoder(next(category_budgets))
            for _ in range(category_budgets.count())
        ]

    raise HTTPException(
        status_code=404,
        detail=f"Category budgets with month: {month} and year: {year} not found",
    )


@router.get(
    "/budget/{category}/",
    response_description="Get category budget by category, month and year",
    response_model=CategoryBudget,
)
def get__category_budget(
    month: int,
    year: int,
    category: str,
    current_user: User = Depends(get_current_active_user),
):
    if (
        category_budget := category_budget_collection.find_one(
            {
                "month": month,
                "year": year,
                "category": category,
                "email": current_user["email"],
            }
        )
    ) is not None:
        return category_budget

    raise HTTPException(
        status_code=404,
        detail=f"Category budget with month: {month} and year: {year} and category: {category} not found",
    )


@router.post(
    "/budget/{category}/",
    response_description="Add new category budget",
    response_model=CategoryBudget,
)
def add_category_budget(
    category_budget: CategoryBudget = Body(...),
    current_user: User = Depends(get_current_active_user),
):
    category_budget.email = current_user["email"]
    category_budget = jsonable_encoder(category_budget)
    new_category_budget = category_budget_collection.insert_one(category_budget)
    created_category_budget = category_budget_collection.find_one(
        {"_id": new_category_budget.inserted_id}
    )
    return JSONResponse(
        status_code=status.HTTP_201_CREATED, content=created_category_budget
    )


@router.put(
    "/budget/{category}",
    response_description="Update a category budget",
    response_model=CategoryBudget,
)
def update_budget(
    month: int,
    year: int,
    category: str,
    category_budget: UpdateCategoryBudgetModel = Body(...),
    current_user: User = Depends(get_current_active_user),
):
    category_budget = {k: v for k, v in category_budget.dict().items() if v is not None}
    category_budget["email"] = current_user["email"]
    category_budget = jsonable_encoder(category_budget)

    if len(category_budget) >= 1:
        update_result = category_budget_collection.update_one(
            {
                "month": month,
                "year": year,
                "category": category,
                "email": current_user["email"],
            },
            {"$set": category_budget},
        )

        if update_result.modified_count == 1:
            if (
                updated_category_budget := category_budget_collection.find_one(
                    {
                        "month": month,
                        "year": year,
                        "category": category,
                        "email": current_user["email"],
                    }
                )
            ) is not None:
                return updated_category_budget

    if (
        existing_category_budget := category_budget_collection.find_one(
            {
                "month": month,
                "year": year,
                "category": category,
                "email": current_user["email"],
            }
        )
    ) is not None:
        return existing_category_budget

    raise HTTPException(
        status_code=404,
        detail=f"Category budget with month: {month} and year: {year} and category: {category} not found",
    )


@router.delete("/budget/{category}", response_description="Delete a category budget")
def delete_category_budget(
    month: int,
    year: int,
    category: str,
    current_user: User = Depends(get_current_active_user),
):
    delete_result = category_budget_collection.delete_one(
        {
            "month": month,
            "year": year,
            "category": category,
            "email": current_user["email"],
        }
    )

    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"Category budget with month: {month} and year: {year} and category: {category} was successfully deleted",
        )

    raise HTTPException(
        status_code=404,
        detail=f"Category budget with month: {month} and year: {year} and category: {category} not found",
    )


def update_category_budget_spent(
    month: int,
    year: int,
    category: str,
    change: float,
    current_user: User = Depends(get_current_active_user),
):
    category_budget: CategoryBudget = category_budget_collection.find_one(
        {
            "month": month,
            "year": year,
            "category": category,
            "email": current_user["email"],
        }
    )
    if category_budget is not None:
        category_budget["spent"] += change
        category_budget_collection.update_one(
            {
                "month": month,
                "year": year,
                "category": category,
                "email": current_user["email"],
            },
            {"$set": category_budget},
        )
        return category_budget

    raise HTTPException(
        status_code=404,
        detail=f"Category budget with month: {month} and year: {year} and category: {category} not found",
    )
