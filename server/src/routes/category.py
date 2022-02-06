from urllib import response
from fastapi import APIRouter, HTTPException, Depends
from ..models import User
from ..middleware import get_current_active_user,get_current_user
from ..database import category_collection

router = APIRouter()


@router.get(
    "/categories",
    response_description="Get users categories",
    response_model=User,
    response_model_include={
        "categories_list"
    },  # omits all the other user attributes except categories_list from the response
)
async def get_current_user_categories(current_user: User = Depends(get_current_user)):
    current_user_categories = current_user.categories_list
    if current_user_categories is not None:
        return current_user_categories
    raise HTTPException(
        status_code=404, detail=f"Categories for current user not found"
    )
