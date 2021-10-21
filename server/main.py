from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/currency")
async def root():
    return{"message": "Price conversion"}
