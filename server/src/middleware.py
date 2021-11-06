'''
- Setup FastAPI middleware to authenticate user based on cookie auth header.
- It should make sure the user is logged in with the correct email and password and if not return an unauthorized error.
- If the user is logged in, then add the user email along with the rest of the request.
'''

from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Optional
from passlib.context import CryptContext


from models.user import User
from database.database import db,user_collection

#secret_key from `openssl rand -hex 32`
SECRET_KEY = "e58b5e9eb9ec7f63fe63ffc548a5bbace9f9fcba248ea1133dc46e4fac40c9a9"
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl  = "token")