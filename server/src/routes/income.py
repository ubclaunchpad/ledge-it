from typing import List

import pymongo
from fastapi import APIRouter, Body, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic.error_wrappers import ValidationError
from datetime import date

from ..routes.image_to_s3 import delete_image, upload_image
from ..middleware import get_current_active_user
from ..models.user import User
from .net_worth import update_net_worth
from ..models.income import Income, UpdateIncomeModel, AddIncome
from ..database.database import income_collection
from ..database.database import net_worth_collection
from ..utils.currency import get_exchange_rate_to_cad

router = APIRouter()


@router.get(
    "/incomes", response_description="Get all incomes", response_model=List[Income]
)
def get_incomes(current_user: User = Depends(get_current_active_user)):
    if (
        all_incomes := income_collection.find({"email": current_user["email"]}).sort(
            [("date", pymongo.DESCENDING), ("updated_at", pymongo.DESCENDING)]
        )
    ).count():
        return [jsonable_encoder(next(all_incomes)) for _ in range(all_incomes.count())]

    raise HTTPException(status_code=404, detail=f"No incomes have been found.")


@router.get(
    "/income/{id}", response_description="Get income by id", response_model=Income
)
def get_income_by_id(id, current_user: User = Depends(get_current_active_user)):
    if (
        income := income_collection.find_one(
            {"_id": id, "email": current_user["email"]}
        )
    ) is not None:
        return income

    raise HTTPException(status_code=404, detail=f"Income with id {id} not found")


@router.post("/income", response_description="Add new income", response_model=Income)
async def create_income(
    income: AddIncome = Body(...), current_user: User = Depends(get_current_active_user)
):
    if (
        net_worth_to_update := net_worth_collection.find_one(
            {"email": current_user["email"]}
        )
    ) is None:
        raise HTTPException(status_code=404, detail=f"Net worth not found")

    update_net_worth(
        net_worth_to_update["_id"], abs(income.amount), income.date, False, current_user
    )

    if income.currency.lower() == "cad":
        income.exchange_rate = 1
    else:
        income.exchange_rate = get_exchange_rate_to_cad(income.currency)

    income_dict = {k: v for k, v in income.dict().items()}

    if "base64_image" in income_dict:
        try:
            income_dict["image_url"] = await upload_image(income_dict["base64_image"])
            del income_dict["base64_image"]
        except ValueError as err:
            raise HTTPException(status_code=404, detail=f"{err}")

    income_dict["email"] = current_user["email"]

    try:
        insert_income = Income(**income_dict)
    except ValidationError as exc:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=jsonable_encoder({"detail": exc.errors()}),
        )

    insert_income = jsonable_encoder(insert_income)
    new_income = income_collection.insert_one(insert_income)
    created_expense = income_collection.find_one({"_id": new_income.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_expense)


@router.put(
    "/income/{id}",
    response_description="Update income selected by id",
    response_model=Income,
)
async def update_income(
    id,
    income: UpdateIncomeModel = Body(...),
    current_user: User = Depends(get_current_active_user),
):
    if (income_to_update := income_collection.find_one({"_id": id})) is None:
        raise HTTPException(status_code=404, detail=f"Income with id {id} not found")
    if (
        net_worth_to_update := net_worth_collection.find_one(
            {"email": current_user["email"]}
        )
    ) is None:
        raise HTTPException(status_code=404, detail=f"Net worth not found")

    amount_change = income.amount - income_to_update["amount"]
    update_net_worth(
        net_worth_to_update["_id"], amount_change, income.date, False, current_user
    )

    if income.currency is not None:
        if income.currency.lower() == "cad":
            income.exchange_rate = 1
        else:
            income.exchange_rate = get_exchange_rate_to_cad(income.currency)

    income = {k: v for k, v in income.dict().items() if v is not None}

    if "base64_image" in income:
        try:
            income["image_url"] = await upload_image(income["base64_image"])
            del income["base64_image"]
        except ValueError as err:
            raise HTTPException(status_code=404, detail=f"{err}")

    income["email"] = current_user["email"]
    income = jsonable_encoder(income)

    if len(income) >= 1:
        update_result = income_collection.update_one(
            {"_id": id, "email": current_user["email"]}, {"$set": income}
        )

        if update_result.modified_count == 1:
            if (
                updated_income := income_collection.find_one(
                    {"_id": id, "email": current_user["email"]}
                )
            ) is not None:
                return updated_income

    if (
        existing_income := income_collection.find_one(
            {"_id": id, "email": current_user["email"]}
        )
    ) is not None:
        return existing_income

    raise HTTPException(status_code=404, detail=f"Income with id {id} not found")


@router.delete(
    "/income/{id}", response_description="Delete income by id", response_model=Income
)
async def delete_income_by_id(
    id, current_user: User = Depends(get_current_active_user)
):
    income_to_delete: Income = income_collection.find_one(
        {"_id": id, "email": current_user["email"]}
    )
    if income_to_delete is None:
        raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")
    if (
        net_worth_to_update := net_worth_collection.find_one(
            {"email": current_user["email"]}
        )
    ) is None:
        raise HTTPException(status_code=404, detail=f"Net worth not found")

    update_net_worth(
        net_worth_to_update["_id"],
        -abs(income_to_delete["amount"]),
        income_to_delete["date"],
        False,
        current_user,
    )

    delete_result = income_collection.delete_one(
        {"_id": id, "email": current_user["email"]}
    )

    if income_to_delete.image_url is not None:
        file_name = income_to_delete.image_url.split("/")[-1]
        try:
            await delete_image(file_name)
        except ValueError as err:
            raise HTTPException(status_code=404, detail=f"{err}")

    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"Income with id {id} was successfully deleted",
        )

    raise HTTPException(status_code=404, detail=f"Income with id {id} not found")


@router.get(
    "/income/limited",
    response_description="Returns limited number of incomes sorted by date",
    response_model=List[Income],
)
def limited_income(
    limit: int = 10,
    offset: int = 0,
    current_user: User = Depends(get_current_active_user),
):
    if (
        all_incomes := income_collection.find(
            {"email": current_user["email"]}, limit=limit, skip=offset
        ).sort([("date", pymongo.DESCENDING), ("updated_at", pymongo.DESCENDING)])
    ).count(with_limit_and_skip=True):
        return [
            jsonable_encoder(next(all_incomes))
            for _ in range(all_incomes.count(with_limit_and_skip=True))
        ]

    raise HTTPException(
        status_code=404,
        detail=f"No incomes have been found with the given conditions.",
    )


@router.get(
    "/income/ranged/{start_time}/{end_time}",
    response_description="Returns incomes that have a date between the start date and end date",
    response_model=List[Income],
)
def ranged_income(
    start_time: date,
    end_time: date,
    current_user: User = Depends(get_current_active_user),
):
    if (
        incomes := income_collection.find(
            {
                "date": {"$gte": str(start_time), "$lt": str(end_time)},
                "email": current_user["email"],
            }
        ).sort([("date", pymongo.DESCENDING), ("updated_at", pymongo.DESCENDING)])
    ).count():
        return [jsonable_encoder(next(incomes)) for _ in range(incomes.count())]

    raise HTTPException(
        status_code=404,
        detail=f"No incomes have been found between the given dates.",
    )


@router.get(
    "/income/specify",
    response_description="Returns incomes that have the specified value in the specified field name",
    response_model=List[Income],
)
def specified_incomes(
    income_name: str = None,
    income_description: str = None,
    income_date: date = None,
    income_amount: float = None,
    income_currency: str = None,
    income_exchange_rate: float = None,
    income_category: str = None,
    current_user: User = Depends(get_current_active_user),
):

    specified_income = {}
    if income_name:
        specified_income["name"] = income_name
    if income_description:
        specified_income["description"] = income_description
    if income_date:
        specified_income["date"] = str(income_date)
    if income_amount:
        specified_income["amount"] = income_amount
    if income_currency:
        specified_income["currency"] = income_currency
    if income_exchange_rate:
        specified_income["exchange_rate"] = income_exchange_rate
    if income_category:
        specified_income["currency"] = income_category
    specified_income["email"] = current_user["email"]

    if (
        incomes := income_collection.find(specified_income).sort(
            [("date", pymongo.DESCENDING), ("updated_at", pymongo.DESCENDING)]
        )
    ).count():
        return [jsonable_encoder(next(incomes)) for _ in range(incomes.count())]

    raise HTTPException(
        status_code=404,
        detail=f"No incomes have been found for the given field name and value.",
    )
