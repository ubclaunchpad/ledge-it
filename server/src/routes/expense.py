import pymongo
from fastapi import APIRouter, Body, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic.error_wrappers import ValidationError
from typing import List, Optional
from re import compile
from datetime import date

from ..middleware import get_current_active_user
from ..models.user import User
from .net_worth import update_net_worth
from .category_budget import update_category_budget_spent
from .budget import update_budget_spent
from ..models import Expense, UpdateExpenseModel, AddExpense
from ..database import expense_collection
from ..database import net_worth_collection
from ..utils.currency import get_exchange_rate_to_cad

router = APIRouter()


@router.get(
    "/expenses/", response_description="Get all expenses", response_model=List[Expense]
)
def get_expenses(current_user: User = Depends(get_current_active_user)):
    if (
        all_expenses := expense_collection.find({"email": current_user["email"]}).sort(
            [("date", pymongo.DESCENDING), ("updated_at", pymongo.DESCENDING)]
        )
    ).count():
        return [
            jsonable_encoder(next(all_expenses)) for _ in range(all_expenses.count())
        ]

    raise HTTPException(status_code=404, detail=f"No expenses have been found.")


@router.get(
    "/expense/{year}/{month}",
    response_description="Get all expenses from the given month and year",
    response_model=List[Expense],
)
def get_expenses_by_month(
    year: int, month: int, current_user: User = Depends(get_current_active_user)
):
    regex = compile(f"{year}-{f'0{month}' if month < 10 else month}-" + r"\d{2}")

    if (
        expenses := expense_collection.find(
            {"date": {"$regex": regex}, "email": current_user["email"]}
        ).sort([("date", pymongo.DESCENDING), ("updated_at", pymongo.DESCENDING)])
    ).count():
        return [jsonable_encoder(next(expenses)) for _ in range(expenses.count())]

    raise HTTPException(
        status_code=404,
        detail=f"No expenses have been found for the given month and year.",
    )


@router.get(
    "/expense/{id}", response_description="Get expense by id", response_model=Expense
)
def get_expense_by_id(id, current_user: User = Depends(get_current_active_user)):
    if (
        expense := expense_collection.find_one(
            {"_id": id, "email": current_user["email"]}
        )
    ) is not None:
        return expense

    raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")


@router.post(
    "/expense/", response_description="Add new expense", response_model=Expense
)
def create_expense(
    expense: AddExpense = Body(...),
    current_user: User = Depends(get_current_active_user),
):
    if (net_worth_to_update := net_worth_collection.find_one({"email": current_user["email"]})) is None:
        raise HTTPException(status_code=404, detail=f"Net worth not found")
    update_net_worth(
        net_worth_to_update["_id"], -abs(expense.price), expense.date, True, current_user
    )
    update_budget_spent(expense.date.month, expense.date.year, expense.price, current_user)
    update_category_budget_spent(
        expense.date.month, expense.date.year, expense.category, expense.price, current_user
    )

    if expense.currency.lower() == "cad":
        expense.exchange_rate = 1
    else:
        expense.exchange_rate = get_exchange_rate_to_cad(expense.currency)

    expense_dict = {k: v for k, v in expense.dict().items()}
    expense_dict["email"] = current_user["email"]

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
def update_expense(
    id,
    expense: UpdateExpenseModel = Body(...),
    current_user: User = Depends(get_current_active_user),
):
    if (expense_to_update := expense_collection.find_one({"_id": id})) is None:
        raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")
    if (net_worth_to_update := net_worth_collection.find_one({"email": current_user["email"]})) is None:
        raise HTTPException(status_code=404, detail=f"Net worth not found")

    price_change = expense_to_update["price"] - expense.price
    update_net_worth(
        net_worth_to_update["_id"], price_change, expense.date, True, current_user
    )
    update_budget_spent(expense.date.month, expense.date.year, -price_change, current_user)
    update_category_budget_spent(
        expense.date.month, expense.date.year, expense.category, -price_change, current_user
    )

    if expense.currency is not None:
        if expense.currency.lower() == "cad":
            expense.exchange_rate = 1
        else:
            expense.exchange_rate = get_exchange_rate_to_cad(expense.currency)

    expense = {k: v for k, v in expense.dict().items() if v is not None}
    expense["email"] = current_user["email"]
    expense = jsonable_encoder(expense)

    if len(expense) >= 1:
        update_result = expense_collection.update_one(
            {"_id": id, "email": current_user["email"]}, {"$set": expense}
        )

        if update_result.modified_count == 1:
            if (
                updated_expense := expense_collection.find_one(
                    {"_id": id, "email": current_user["email"]}
                )
            ) is not None:
                return updated_expense

    if (
        existing_expense := expense_collection.find_one(
            {"_id": id, "email": current_user["email"]}
        )
    ) is not None:
        return existing_expense

    raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")


@router.delete("/expense/{id}", response_description="Delete an expense")
def delete_expense(id, current_user: User = Depends(get_current_active_user)):
    expense_to_delete: Expense = expense_collection.find_one(
        {"_id": id, "email": current_user["email"]}
    )
    if expense_to_delete is None:
        raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")
    if (net_worth_to_update := net_worth_collection.find_one({"email": current_user["email"]})) is None:
        raise HTTPException(status_code=404, detail=f"Net worth not found")

    update_net_worth(
        net_worth_to_update["_id"],
        expense_to_delete["price"],
        expense_to_delete["date"],
        True,
        current_user
    )
    update_budget_spent(
        date.fromisoformat(expense_to_delete["date"]).month,
        date.fromisoformat(expense_to_delete["date"]).year,
        -expense_to_delete["price"],
        current_user
    )
    update_category_budget_spent(
        date.fromisoformat(expense_to_delete["date"]).month,
        date.fromisoformat(expense_to_delete["date"]).year,
        expense_to_delete["category"],
        -expense_to_delete["price"],
        current_user
    )

    delete_result = expense_collection.delete_one(
        {"_id": expense_to_delete["_id"], "email": current_user["email"]}
    )

    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"Expense with id {id} was successfully deleted",
        )

    raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")


@router.get(
    "/expense/limited/",
    response_description="Returns limited number of expenses sorted by date",
    response_model=List[Expense],
)
def limited_expenses(
    limit: int = 10,
    offset: int = 0,
    current_user: User = Depends(get_current_active_user),
):
    if (
        all_expenses := expense_collection.find(
            {"email": current_user["email"]}, limit=limit, skip=offset
        ).sort([("date", pymongo.DESCENDING), ("updated_at", pymongo.DESCENDING)])
    ).count(with_limit_and_skip=True):
        return [
            jsonable_encoder(next(all_expenses))
            for _ in range(all_expenses.count(with_limit_and_skip=True))
        ]

    raise HTTPException(
        status_code=404,
        detail=f"No expenses have been found with the given conditions.",
    )


@router.get(
    "/expense/ranged/{start_time}/{end_time}",
    response_description="Returns expenses that have a date between the start date and end date",
    response_model=List[Expense],
)
def ranged_expenses(
    start_time: date,
    end_time: date,
    current_user: User = Depends(get_current_active_user),
):
    if (
        expenses := expense_collection.find(
            {
                "date": {"$gte": str(start_time), "$lt": str(end_time)},
                "email": current_user["email"],
            }
        ).sort([("date", pymongo.DESCENDING), ("updated_at", pymongo.DESCENDING)])
    ).count():
        return [jsonable_encoder(next(expenses)) for _ in range(expenses.count())]

    raise HTTPException(
        status_code=404, detail=f"No expenses have been found between the given dates.",
    )


@router.get(
    "/expense/specify/",
    response_description="Returns expenses that have the specified value in the specified field name",
    response_model=List[Expense],
)
def specified_expenses(
    expense_name: str = None,
    expense_description: str = None,
    expense_date: date = None,
    expense_price: float = None,
    expense_currency: str = None,
    expense_exchange_rate: float = None,
    expense_category: str = None,
    current_user: User = Depends(get_current_active_user),
):
    specified_expense = {}
    if expense_name:
        specified_expense["name"] = expense_name
    if expense_description:
        specified_expense["description"] = expense_description
    if expense_date:
        specified_expense["date"] = str(expense_date)
    if expense_price:
        specified_expense["price"] = expense_price
    if expense_currency:
        specified_expense["currency"] = expense_currency
    if expense_exchange_rate:
        specified_expense["exchange_rate"] = expense_exchange_rate
    if expense_category:
        specified_expense["currency"] = expense_category
    specified_expense["email"] = current_user["email"]

    if (
        expenses := expense_collection.find(specified_expense).sort(
            [("date", pymongo.DESCENDING), ("updated_at", pymongo.DESCENDING)]
        )
    ).count():
        return [jsonable_encoder(next(expenses)) for _ in range(expenses.count())]

    raise HTTPException(
        status_code=404,
        detail=f"No expenses have been found for the given field name and value.",
    )
