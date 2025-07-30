from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlmodel import Session, select
from database import get_session
from models import User
from auth import create_access_token, get_current_user
from utils import hash_password, verify_password
# from schemas import LoginRequest, TokenResponse

router = APIRouter()

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.get("/")
def get_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users



@router.post("/", response_model=User)
def register_user(user: UserCreate, session: Session = Depends(get_session)):
    # Check if user already exists
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user



@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=token)


# @router.post("/login", response_model=TokenResponse)
# def login(payload: LoginRequest, session: Session = Depends(get_session)):
#     user = session.exec(select(User).where(User.email == payload.email)).first()
#     if not user or not verify_password(payload.password, user.hashed_password):
#         raise HTTPException(status_code=401, detail="Invalid email or password")
    
#     token = create_access_token({"sub": str(user.id)})
#     return TokenResponse(access_token=token)


@router.get("/me", response_model=User)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user
