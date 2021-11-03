from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..models.income import Income, UpdateIncomeModel
from ..database.database import income_collection


router = APIRouter()


@router.get(
    "/income/{id}", response_description="Get income by id", response_model=Income
)
def get_income_by_id(id):
    if (income := income_collection.find_one({"_id": id})) is not None:
        return income

    raise HTTPException(status_code=404, detail=f"Income with id {id} not found")


@router.post("/income/", response_description="Add new income", response_model=Income)
def create_income(income: Income = Body(...)):
    income = jsonable_encoder(Income)
    new_income = income_collection.insert_one(income)
    created_income = income_collection.find_one({"_id": new_income.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_income)


@router.delete(
    "/income/{id}", response_description="Delete income by id", response_model=Income
)
def delete_income_by_id(id):
    delete_result = income_collection.delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"Income with id {id} was successfully deleted",
        )

    raise HTTPException(status_code=404, detail=f"Income with id {id} not found")


@router.put(
    "/income/{id}", response_description="Edit income by id", response_model=Income
)
def edit_income_by_id(id, income: UpdateIncomeModel = Body(...)):
    income = {k: v for k, v in income.dict().items() if v is not None}

    if len(income) >= 1:
        update_result = income_collection.update_one({"_id": id}, {"$set": income})

        if update_result.modified_count == 1:
            if (updated_income := income_collection.find_one({"_id": id})) is not None:
                return updated_income

    if (existing_income := income_collection.find_one({"_id": id})) is not None:
        return existing_income

    raise HTTPException(status_code=404, detail=f"Income with id {id} not found")
