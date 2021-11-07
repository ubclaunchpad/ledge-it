from fastapi import FastAPI
from src.routes import expense

# Note: the server runs on http://127.0.0.1:8000

app = FastAPI()

# To test authentication, uncomment the line below to be able to test on `localhost:8000/docs`
# Will clean it up and set it up from routes folder in another commit
from src.middleware import *

app.include_router(expense.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}


"""
#create one user to check if authentication is working
from src.models.user import User
from src.database import user_collection
from src.middleware import pwd_context
password='abc123'
hashed_password = pwd_context.hash(password) 
data = {
    "email": "testuser@moneymanager.com",
    "hashed_password": hashed_password,
    #"hashed_password":'$2b$12$oYZXMp8R.yRn30hosXDGUeQqc2flZqVyehlLKL1nYEd2sBg9EpTBW',
    "active": True,
}
user = User(**data).dict()
user_collection.insert_one(user)"""
