from pydantic import BaseModel

# Location is stored as an x and y coordinate (easier to input into maps APIs)
# All fields are currently required
class Expense(BaseModel):
    id: int
    name: str
    description: str
    date: date
    price: float
    currency: str 
    exchange_rate: float 
    locationx: float
    locationy: float 
    category: str 
    sub_category: str