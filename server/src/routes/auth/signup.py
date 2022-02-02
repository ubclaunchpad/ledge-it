from fastapi import APIRouter, Body, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from ...middleware import pwd_context
from ...models import User
from ...database import user_collection

router = APIRouter()


@router.post("/signup", response_description="Add new user", response_model=User)
def create_user(user: User = Body(...)):
    if user_collection.find_one({"email": user.email}) is not None:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content=jsonable_encoder({"error": "User already exists"}),
        )
    new_user = User(
        email=user.email, hashed_password=pwd_context.hash(user.hashed_password),
    )
    new_user = jsonable_encoder(new_user)
    insert_user = user_collection.insert_one(new_user)
    created_user = user_collection.find_one({"_id": insert_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)
