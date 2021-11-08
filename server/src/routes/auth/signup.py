from fastapi import APIRouter, Body, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ...models import User, UserInDB
from ...database import user_collection
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/signup/", response_description="Add new user", response_model=UserInDB)
def create_user(user: User = Body(...)):
    new_user = UserInDB(
        username=user.username,
        email=user.email,
        hashed_password=pwd_context.hash(user.password),
    )
    new_user = jsonable_encoder(new_user)
    insert_user = user_collection.insert_one(new_user)
    created_user = user_collection.find_one({"_id": insert_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)
