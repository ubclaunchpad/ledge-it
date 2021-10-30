from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from src.models import Expense, UpdateExpenseModel
from src.database.database import db

router = APIRouter()


@router.get(
    "/expense/{id}", response_description="Get expense by id", response_model=Expense
)
def get_expense_by_id(id):
    if (expense := db["expenses"].find_one({"_id": id})) is not None:
        return expense

    raise HTTPException(status_code=404, detail=f"Expense {id} not found")


@router.post(
    "/expense/", response_description="Add new expense", response_model=Expense
)
def create_expense(expense: Expense = Body(...)):
    expense = jsonable_encoder(expense)
    new_expense = db["expenses"].insert_one(expense)
    created_expense = db["expenses"].find_one({"_id": new_expense.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_expense)


@router.put(
    "/expense/{id}", response_description="Update an expense", response_model=Expense
)
def update_expense(id, expense: UpdateExpenseModel = Body(...)):
    expense = {k: v for k, v in expense.dict().items() if v is not None}

    if len(expense) >= 1:
        update_result = db["expenses"].update_one({"_id": id}, {"$set": expense})

        if update_result.modified_count == 1:
            if (updated_expense := db["expenses"].find_one({"_id": id})) is not None:
                return updated_expense

    if (existing_expense := db["expenses"].find_one({"_id": id})) is not None:
        return existing_expense

    raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")


@router.delete("/expense/{id}", response_description="Delete an expense")
def delete_expense(id):
    delete_result = db["expenses"].delete_one({"_id": id})
    return_content = jsonable_encoder(
        {"status code": 204, "msg": "Successfully deleted"}
    )

    if delete_result.deleted_count == 1:
        # JSONResponse(status_code=status.HTTP_204_NO_CONTENT) returns error
        return JSONResponse(content=return_content)

    raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")