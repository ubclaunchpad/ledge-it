from fastapi import FastAPI
from src.routes import expense, income, budget, category_budget

# Note: the server runs on http://127.0.0.1:8000

app = FastAPI()

app.include_router(expense.router)
app.include_router(income.router)
app.include_router(budget.router)
app.include_router(category_budget.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
