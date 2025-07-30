# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True


class DataFileBase(BaseModel):
    filename: str

class DataFileCreate(DataFileBase):
    pass

class DataFileOut(DataFileBase):
    id: int
    file_path: str
    uploaded_at: datetime
    class Config:
        orm_mode = True


class AnalysisOut(BaseModel):
    id: int
    summary: Optional[str]
    generated_at: datetime
    class Config:
        orm_mode = True


class UserQueryCreate(BaseModel):
    question: str

class UserQueryOut(UserQueryCreate):
    id: int
    response: Optional[str]
    timestamp: datetime
    class Config:
        orm_mode = True
