from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..models import Budget, UpdateBudgetModel
from ..database import budget_collection

router = APIRouter()

@router.post(
    "/budget/", response_description="Add new budget", response_model=Budget
)
def add_budget(budget: Budget = Body(...)):
    budget = jsonable_encoder(budget)
    new_budget = budget_collection.insert_one(budget)
    created_budget = budget_collection.find_one({"_id": new_budget.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_budget)

@router.put(
    "/budget/{id}", response_description="Update a budget", response_model=Budget
)
def update_budget(id, budget: UpdateBudgetModel = Body(...)):
    budget = {k: v for k, v in budget.dict().items() if v is not None}

    if len(budget) >= 1:
        update_result = budget_collection.update_one({"_id": id}, {"$set": budget})

        if update_result.modified_count == 1:
            if (
                updated_budget := budget_collection.find_one({"_id": id})
            ) is not None:
                return updated_budget

    if (existing_budget := budget_collection.find_one({"_id": id})) is not None:
        return existing_budget

    raise HTTPException(status_code=404, detail=f"Budget with id {id} not found")

@router.delete("/budget/{id}", response_description="Delete a budget")
def delete_budget(id):
    delete_result = budget_collection.delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"Budget with id {id} was successfully deleted",
        )

    raise HTTPException(status_code=404, detail=f"Budget with id {id} not found")

