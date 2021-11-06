from fastapi import FastAPI
from src.routes import expense
from src.utils import net_worth

# Note: the server runs on http://127.0.0.1:8000

app = FastAPI()

app.include_router(expense.router)
app.include_router(net_worth.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
