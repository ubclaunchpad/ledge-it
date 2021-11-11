from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..models import NetWorth
from ..database import net_worth_collection
from datetime import datetime
import heapq

router = APIRouter()


@router.get(
    "/net_worth/{id}",
    response_description="Get NetWorth by id",
    response_model=NetWorth,
)
def get_net_worth_by_id(id):
    if (nwm := net_worth_collection.find_one({"_id": id})) is not None:
        return nwm
    raise HTTPException(status_code=404, detail=f"NetWorth with id {id} not found")


@router.post(
    "/net_worth", response_description="Add new NetWorth Model", response_model=NetWorth
)
def create_net_worth(nwm: NetWorth = Body(...)):
    nwm = jsonable_encoder(nwm)
    new_nwm = net_worth_collection.insert_one(nwm)
    created_nwm = net_worth_collection.find_one({"_id": new_nwm.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_nwm)


@router.put(
    "/net_worth/{id}",
    response_description="Update a NetWorthModel",
    response_model=NetWorth,
)
def update_net_worth(id: str, change: float = Body(...)):
    if (nwm := net_worth_collection.find_one({"_id": id})) is not None:
        todays_date = datetime.today().strftime("%Y-%m-%d")
        nwm["current"] += change
        if nwm["history"][-1]["date"] == todays_date:
            nwm["history"][-1]["value"] = nwm["current"]
        else:
            nwm["history"].append({"date": todays_date, "value": nwm["current"]})
        update_result = net_worth_collection.update_one({"_id": id}, {"$set": nwm})
        if (updated_student := net_worth_collection.find_one({"_id": id})) is not None:
            return updated_student
    raise HTTPException(status_code=404, detail=f"Student {id} not found")


@router.delete("/net_worth/{id}", response_description="Delete a NetWorthModel")
def delete_net_worth(id: str):
    delete_result = net_worth_collection.delete_one({"_id": id})
    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"NetWorth with id {id} was successfully deleted",
        )
    raise HTTPException(status_code=404, detail=f"NetWorth with id {id} not found")
