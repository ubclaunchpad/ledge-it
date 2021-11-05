from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..models import CategoryBudget, UpdateCategoryBudgetModel
from ..database import cbudget_collection

router = APIRouter()

@router.post(
    "/cbudget/", response_description="Add new category budget", response_model=CategoryBudget
)
def add_cbudget(cbudget: CategoryBudget = Body(...)):
    cbudget = jsonable_encoder(cbudget)
    new_cbudget = cbudget_collection.insert_one(cbudget)
    created_cbudget = cbudget_collection.find_one({"_id": new_cbudget.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_cbudget)

@router.put(
    "/cbudget/{id}", response_description="Update a category budget", response_model=CategoryBudget
)
def update_budget(id, cbudget: UpdateCategoryBudgetModel = Body(...)):
    cbudget = {k: v for k, v in cbudget.dict().items() if v is not None}

    if len(cbudget) >= 1:
        update_result = cbudget_collection.update_one({"_id": id}, {"$set": cbudget})

        if update_result.modified_count == 1:
            if (
                updated_cbudget := cbudget_collection.find_one({"_id": id})
            ) is not None:
                return updated_cbudget

    if (existing_cbudget := cbudget_collection.find_one({"_id": id})) is not None:
        return existing_cbudget

    raise HTTPException(status_code=404, detail=f"Category Budget with id {id} not found")

@router.delete("/cbudget/{id}", response_description="Delete a category budget")
def delete_cbudget(id):
    delete_result = cbudget_collection.delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"Category Budget with id {id} was successfully deleted",
        )

    raise HTTPException(status_code=404, detail=f"Category Budget with id {id} not found")

