from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic.error_wrappers import ValidationError
from ..models import Expense, UpdateExpenseModel, AddExpense
from ..database import expense_collection
from ..utils.currency import get_exchange_rate_to_cad

router = APIRouter()


@router.get(
    "/expense/{id}", response_description="Get expense by id", response_model=Expense
)
def get_expense_by_id(id):
    if (expense := expense_collection.find_one({"_id": id})) is not None:
        return expense

    raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")


@router.post(
    "/expense/", response_description="Add new expense", response_model=Expense
)
def create_expense(expense: AddExpense = Body(...)):
    if expense.currency.lower() == "cad":
        expense.exchange_rate = 1
    else:
        expense.exchange_rate = get_exchange_rate_to_cad(expense.currency)

    expense_dict = {k: v for k, v in expense.dict().items()}

    try:
        insert_expense = Expense(**expense_dict)
    except ValidationError as exc:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=jsonable_encoder({"detail": exc.errors()}),
        )

    insert_expense = jsonable_encoder(insert_expense)
    new_expense = expense_collection.insert_one(insert_expense)
    created_expense = expense_collection.find_one({"_id": new_expense.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_expense)


@router.put(
    "/expense/{id}", response_description="Update an expense", response_model=Expense
)
def update_expense(id, expense: UpdateExpenseModel = Body(...)):
    if expense.currency is not None:
        if expense.currency.lower() == "cad":
            expense.exchange_rate = 1
        else:
            try:
                expense.exchange_rate = get_exchange_rate_to_cad(expense.currency)
            except ValidationError as exc:
                return JSONResponse(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    content=jsonable_encoder({"detail": exc.errors()}),
                )

    expense = {k: v for k, v in expense.dict().items() if v is not None}
    expense = jsonable_encoder(expense)

    if len(expense) >= 1:
        update_result = expense_collection.update_one({"_id": id}, {"$set": expense})

        if update_result.modified_count == 1:
            if (
                updated_expense := expense_collection.find_one({"_id": id})
            ) is not None:
                return updated_expense

    if (existing_expense := expense_collection.find_one({"_id": id})) is not None:
        return existing_expense

    raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")


@router.delete("/expense/{id}", response_description="Delete an expense")
def delete_expense(id):
    delete_result = expense_collection.delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"Expense with id {id} was successfully deleted",
        )

    raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")
