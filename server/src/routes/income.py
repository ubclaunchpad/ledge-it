from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic.error_wrappers import ValidationError
from pymongo.message import update
from ..models.income import Income, UpdateIncomeModel, AddIncome
from ..database.database import income_collection
from ..database.database import net_worth_collection
from ..utils.currency import get_exchange_rate_to_cad

router = APIRouter()


@router.get(
    "/income/{id}", response_description="Get income by id", response_model=Income
)
def get_income_by_id(id):
    if (income := income_collection.find_one({"_id": id})) is not None:
        return income

    raise HTTPException(status_code=404, detail=f"Income with id {id} not found")


@router.post("/income/", response_description="Add new income", response_model=Income)
def create_income(income: AddIncome = Body(...)):
    if (net_worth_to_update := net_worth_collection.find_one()) is None:
        raise HTTPException(status_code=404, detail=f"Net worths not found")

    updated_current = net_worth_to_update["current"] + income.amount
    updated_all_time_income = net_worth_to_update["all_time_income"] + income.amount

    if income.currency.lower() == "cad":
        income.exchange_rate = 1
    else:
        income.exchange_rate = get_exchange_rate_to_cad(income.currency)

    income_dict = {k: v for k, v in income.dict().items()}

    try:
        insert_income = Income(**income_dict)
    except ValidationError as exc:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=jsonable_encoder({"detail": exc.errors()}),
        )

    net_worth_collection.update_one(
        {"_id": net_worth_to_update["_id"]},
        {
            "$set": jsonable_encoder(
                {"current": updated_current, "all_time_income": updated_all_time_income}
            )
        },
    )
    insert_income = jsonable_encoder(insert_income)
    new_income = income_collection.insert_one(insert_income)
    created_income = income_collection.find_one({"_id": new_income.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_income)


@router.delete(
    "/income/{id}", response_description="Delete income by id", response_model=Income
)
def delete_income_by_id(id):
    if (income_to_delete := income_collection.find_one({"_id": id})) is None:
        raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")
    if (net_worth_to_update := net_worth_collection.find_one()) is None:
        raise HTTPException(status_code=404, detail=f"Net worths not found")

    updated_current = net_worth_to_update["current"] - income_to_delete["amount"]
    updated_all_time_income = (
        net_worth_to_update["all_time_income"] - income_to_delete["amount"]
    )

    delete_result = income_collection.delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        net_worth_collection.update_one(
            {"_id": net_worth_to_update["_id"]},
            {
                "$set": jsonable_encoder(
                    {
                        "current": updated_current,
                        "all_time_income": updated_all_time_income,
                    }
                )
            },
        )
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"Income with id {id} was successfully deleted",
        )

    raise HTTPException(status_code=404, detail=f"Income with id {id} not found")


@router.put(
    "/income/{id}",
    response_description="Update income selected by id",
    response_model=Income,
)
def update_income(id, income: UpdateIncomeModel = Body(...)):
    if (income_to_update := income_collection.find_one({"_id": id})) is None:
        raise HTTPException(status_code=404, detail=f"Expense with id {id} not found")
    if (net_worth_to_update := net_worth_collection.find_one()) is None:
        raise HTTPException(status_code=404, detail=f"Net worths not found")

    amount_change = income.amount - income_to_update["amount"]
    updated_current = net_worth_to_update["current"] + amount_change
    updated_all_time_income = net_worth_to_update["all_time_income"] + amount_change

    if income.currency is not None:
        if income.currency.lower() == "cad":
            income.exchange_rate = 1
        else:
            try:
                income.exchange_rate = get_exchange_rate_to_cad(income.currency)
            except ValidationError as exc:
                return JSONResponse(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    content=jsonable_encoder({"detail": exc.errors()}),
                )

    income = {k: v for k, v in income.dict().items() if v is not None}
    income = jsonable_encoder(income)

    if len(income) >= 1:
        update_result = income_collection.update_one({"_id": id}, {"$set": income})

        if update_result.modified_count == 1:
            if (updated_income := income_collection.find_one({"_id": id})) is not None:
                net_worth_collection.update_one(
                    {"_id": net_worth_to_update["_id"]},
                    {
                        "$set": jsonable_encoder(
                            {
                                "current": updated_current,
                                "all_time_income": updated_all_time_income,
                            }
                        )
                    },
                )
                return updated_income

    if (existing_income := income_collection.find_one({"_id": id})) is not None:
        return existing_income

    raise HTTPException(status_code=404, detail=f"Income with id {id} not found")
