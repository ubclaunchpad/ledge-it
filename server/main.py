from fastapi import FastAPI
from src.routes import expense

app = FastAPI()

app.include_router(expense.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
