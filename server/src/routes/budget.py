from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..models import Budget, UpdateBudgetModel
from ..database import budget_collection
from typing import List

router = APIRouter()


@router.get(
    "/budget/",
    response_description="Get budget by month and year",
    response_model=Budget,
)
def get_budget(month: int, year: int):
    if (
        budget := budget_collection.find_one({"month": month, "year": year})
    ) is not None:
        return budget

    raise HTTPException(
        status_code=404, detail=f"Budget with month: {month} and year: {year} not found"
    )


@router.post("/budget/", response_description="Add new budget", response_model=Budget)
def add_budget(budget: Budget = Body(...)):
    budget = jsonable_encoder(budget)
    new_budget = budget_collection.insert_one(budget)
    created_budget = budget_collection.find_one({"_id": new_budget.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_budget)


@router.put("/budget/", response_description="Update a budget", response_model=Budget)
def update_budget(month: int, year: int, budget: UpdateBudgetModel = Body(...)):
    budget = {k: v for k, v in budget.dict().items() if v is not None}
    budget = jsonable_encoder(budget)

    if len(budget) >= 1:
        update_result = budget_collection.update_one(
            {"month": month, "year": year}, {"$set": budget}
        )

        if update_result.modified_count == 1:
            if (
                updated_budget := budget_collection.find_one(
                    {"month": month, "year": year}
                )
            ) is not None:
                return updated_budget

    if (
        existing_budget := budget_collection.find_one({"month": month, "year": year})
    ) is not None:
        return existing_budget

    raise HTTPException(
        status_code=404, detail=f"Budget with month: {month} and year: {year} not found"
    )


@router.delete("/budget/", response_description="Delete a budget")
def delete_budget(month: int, year: int):
    delete_result = budget_collection.delete_one({"month": month, "year": year})

    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"Budget with month: {month} and year: {year} was successfully deleted",
        )

    raise HTTPException(
        status_code=404, detail=f"Budget with month: {month} and year: {year} not found"
    )

@router.get(
    "/allBudget/",
    response_description = "Get all stored budgets",
    response_model = List[Budget],
)
def get_allBudget():
    if (
        allBudget := budget_collection.find()
    ) is not None:
        return allBudget

    raise HTTPException(
        status_code=404, detail=f"No budgets have been found."
    )
