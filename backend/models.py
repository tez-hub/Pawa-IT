
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    files: List["DataFile"] = Relationship(back_populates="owner")
    queries: List["UserQuery"] = Relationship(back_populates="user")


class DataFile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    file_path: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

    owner_id: int = Field(foreign_key="user.id")
    owner: Optional[User] = Relationship(back_populates="files")

    analyses: List["Analysis"] = Relationship(back_populates="file")


class Analysis(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    summary: Optional[str]
    generated_at: datetime = Field(default_factory=datetime.utcnow)

    file_id: int = Field(foreign_key="datafile.id")
    file: Optional[DataFile] = Relationship(back_populates="analyses")


class UserQuery(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    question: str
    response: Optional[str]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    user_id: int = Field(foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="queries")





# # models.py
# from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql import func
# from sqlalchemy.ext.declarative import declarative_base

# Base = declarative_base()

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True, nullable=False)
#     hashed_password = Column(String, nullable=False)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())

#     files = relationship("DataFile", back_populates="owner")
#     queries = relationship("UserQuery", back_populates="user")


# class DataFile(Base):
#     __tablename__ = "data_files"

#     id = Column(Integer, primary_key=True, index=True)
#     filename = Column(String, nullable=False)
#     file_path = Column(String, nullable=False)
#     uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

#     owner_id = Column(Integer, ForeignKey("users.id"))
#     owner = relationship("User", back_populates="files")

#     analyses = relationship("Analysis", back_populates="file")


# class Analysis(Base):
#     __tablename__ = "analyses"

#     id = Column(Integer, primary_key=True, index=True)
#     summary = Column(Text, nullable=True)
#     generated_at = Column(DateTime(timezone=True), server_default=func.now())

#     file_id = Column(Integer, ForeignKey("data_files.id"))
#     file = relationship("DataFile", back_populates="analyses")


# class UserQuery(Base):
#     __tablename__ = "user_queries"

#     id = Column(Integer, primary_key=True, index=True)
#     question = Column(Text, nullable=False)
#     response = Column(Text, nullable=True)
#     timestamp = Column(DateTime(timezone=True), server_default=func.now())

#     user_id = Column(Integer, ForeignKey("users.id"))
#     user = relationship("User", back_populates="queries")




