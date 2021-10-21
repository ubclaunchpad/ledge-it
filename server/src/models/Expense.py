from pydantic import BaseModel

# Location is stored as an x and y coordinate (easier to input into maps APIs)
# All fields are currently required
class Expense(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    # .... the rest of the fields
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
    name: str
    description: Optional[str] = None
    date: date
    price: float
    currency: str 
    exchange_rate: float 
    location: Optional[str] = None
    locationx: Optional[float] = None
    locationy: Optiona[float] = None
    category: str 
    sub_category: Optional[str] = None