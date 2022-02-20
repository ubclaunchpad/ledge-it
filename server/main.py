from fastapi import FastAPI
from src.routes import (
    expense,
    income,
    budget,
    category_budget,
    signup,
    login,
    net_worth,
    category,
    image_to_s3,
)

# Note: the server runs on http://127.0.0.1:8000

app = FastAPI()

app.include_router(expense.router)
app.include_router(net_worth.router)
app.include_router(income.router)
app.include_router(budget.router)
app.include_router(category_budget.router)
app.include_router(signup.router)
app.include_router(login.router)
app.include_router(category.router)
app.include_router(image_to_s3.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
