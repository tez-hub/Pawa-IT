import os
import pandas as pd
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlmodel import Session
from database import get_session
from models import DataFile, User
from auth import get_current_user
from uuid import uuid4

UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter()

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user)
):
    filename = f"{uuid4().hex}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    # Save the uploaded file
    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    # Read preview from file (first 5 rows)
    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file_path)
        elif file.filename.endswith((".xls", ".xlsx")):
            df = pd.read_excel(file_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        preview = df.head().to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read file: {str(e)}")

    # Save metadata to DB
    data_file = DataFile(
        filename=file.filename,
        file_path=file_path,
        owner_id=user.id
    )
    session.add(data_file)
    session.commit()
    session.refresh(data_file)

    return {
        "message": "File uploaded",
        "file_id": data_file.id,
        "preview": preview
    }
