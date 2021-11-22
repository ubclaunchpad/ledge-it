from fastapi import FastAPI
from src.routes import expense

# Note: the server runs on http://127.0.0.1:8000

app = FastAPI()

app.include_router(expense.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
