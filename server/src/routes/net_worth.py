from fastapi import APIRouter, Body, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from ..middleware import get_current_active_user
from ..models.user import User
from ..models import NetWorth
from ..database import net_worth_collection
from datetime import date

router = APIRouter()


@router.get(
    "/net_worth/{id}",
    response_description="Get NetWorth by id",
    response_model=NetWorth,
)
def get_net_worth_by_id(id, current_user: User = Depends(get_current_active_user)):
    if (
        nwm := net_worth_collection.find_one(
            {"_id": id, "email": current_user["email"]}
        )
    ) is not None:
        return nwm
    raise HTTPException(status_code=404, detail=f"NetWorth with id {id} not found")


@router.post(
    "/net_worth",
    response_description="Add new Net worth model",
    response_model=NetWorth,
)
def create_net_worth(
    nwm: NetWorth = Body(...), current_user: User = Depends(get_current_active_user)
):
    nwm["email"] = current_user["email"]
    nwm = jsonable_encoder(nwm)
    new_nwm = net_worth_collection.insert_one(nwm)
    created_nwm = net_worth_collection.find_one(
        {"_id": new_nwm.inserted_id, "email": current_user["email"]}
    )
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_nwm)


@router.put(
    "/net_worth/{id}",
    response_description="Update a Net Worth model",
    response_model=NetWorth,
)
def update_net_worth(
    id: str,
    change: float,
    added_date: date,
    is_expense: bool = False,
    current_user: User = Depends(get_current_active_user),
):
    nwm: NetWorth = net_worth_collection.find_one(
        {"_id": id, "email": current_user["email"]}
    )

    if nwm is not None:
        nwm.current += change
        if is_expense:
            nwm.all_time_expenses -= change
        else:
            nwm.all_time_income += change

        if len(nwm.history) == 0 or date.fromisoformat(
            str(added_date)
        ) > date.fromisoformat(nwm.history[-1]["date"]):
            nwm.history.append({"date": str(added_date), "value": nwm.current})
        elif date.fromisoformat(str(added_date)) == date.fromisoformat(
            nwm.history[-1]["date"]
        ):
            nwm.history[-1]["value"] = nwm.current
        else:
            index = len(nwm.history) - 1
            while index >= 0 and date.fromisoformat(
                nwm.history[index]["date"]
            ) >= date.fromisoformat(str(added_date)):
                nwm.history[index]["value"] = (
                    float(nwm.history[index]["value"]) + change
                )
                index -= 1

            if index == -1 or nwm.history[index + 1]["date"] != date.fromisoformat(
                str(added_date)
            ):
                if index == -1:
                    value_to_add = change
                else:
                    value_to_add = nwm.history[index]["value"] + change
                nwm.history.insert(
                    index + 1, {"date": str(added_date), "value": value_to_add,},
                )

        net_worth_collection.update_one(
            {"_id": id, "email": current_user["email"]}, {"$set": nwm}
        )
        return nwm

    raise HTTPException(status_code=404, detail=f"Net worth not found {id} not found")


@router.delete("/net_worth/{id}", response_description="Delete a Net Worth model")
def delete_net_worth(id: str, current_user: User = Depends(get_current_active_user)):
    delete_result = net_worth_collection.delete_one(
        {"_id": id, "email": current_user["email"]}
    )
    if delete_result.deleted_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=f"NetWorth with id {id} was successfully deleted",
        )
    raise HTTPException(status_code=404, detail=f"Net Worth with id {id} not found")
