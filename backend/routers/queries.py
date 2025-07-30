from fastapi import HTTPException, APIRouter, Depends, Form
from utils import try_parse_chart_data
from sqlmodel import Session, select
from models import DataFile, UserQuery, User
from file_utils import extract_text_from_file
from functools import lru_cache
from database import get_session
from auth import get_current_user
from llm_setup import get_gemini_chain

router = APIRouter()

# @router.post("/ask")
# def ask_about_file(file_id: int, question: str, session: Session = Depends(get_session), user: User = Depends(get_current_user)):
#     # Get the file
#     file = session.get(DataFile, file_id)
#     if not file:
#         raise HTTPException(status_code=404, detail="File not found")

#     # Read file content (assuming text or CSV)
#     try:
#         with open(file.file_path, "r", encoding="utf-8") as f:
#             file_content = f.read()
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")

#     # Get Gemini chain and run
#     chain = get_gemini_chain()
#     result = chain.invoke({"question": question, "file_content": file_content})

#     # Save the query
#     query_record = UserQuery(
#         question=question,
#         response=result.content,
#         user_id=user.id
#     )
#     session.add(query_record)
#     session.commit()
#     session.refresh(query_record)

#     return {
#         "question": question,
#         "response": result.content
#     }



@lru_cache(maxsize=100)
def cached_analysis(question: str, content: str):
    chain = get_gemini_chain()
    return chain.invoke({"question": question, "file_content": content})

# @router.post("/ask")
# def ask_about_file(file_id: int, question: str, session: Session = Depends(get_session), user: User = Depends(get_current_user)):
#     file = session.get(DataFile, file_id)
#     if not file:
#         raise HTTPException(status_code=404, detail="File not found")

#     # Read content based on file type
#     file_content = extract_text_from_file(file.file_path)
#     if "Error" in file_content:
#         raise HTTPException(status_code=500, detail=file_content)

#     # Use cache to avoid duplicate API calls
#     result = cached_analysis(question, file_content)

#     # Save query
#     query = UserQuery(question=question, response=result.content, user_id=user.id)
#     session.add(query)
#     session.commit()
#     session.refresh(query)

#     return {"question": question, "response": result.content}


@router.post("/ask")
def ask_about_file(
    file_id: int = Form(...),
    question: str = Form(...),
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user)
):
    print(f"Received question: {question} for file ID: {file_id}")
    file = session.get(DataFile, file_id)
    if not file:
        raise HTTPException(status_code=404, detail="File not found")

    # Read file content
    file_content = extract_text_from_file(file.file_path)
    if "Error" in file_content:
        raise HTTPException(status_code=500, detail=file_content)

    # Get result from Gemini chain
    result = cached_analysis(question, file_content)

    parsed_result = try_parse_chart_data(result.content)

    print(f"Parsed result: {parsed_result}")

    # Try to extract chart info
    # chart_data, chart_type = try_parse_chart_data(result.content)
    chart_data, chart_type = parsed_result if parsed_result else (None, None)

    # Save query to DB
    query = UserQuery(
        question=question,
        response=result.content,
        user_id=user.id
    )
    session.add(query)
    session.commit()
    session.refresh(query)

    return {
        "question": question,
        "response": result.content,
        "chart_data": chart_data,
        "chart_type": chart_type
    }



