import os
import pandas as pd
import pdfplumber
import fitz 

def extract_text_from_file(file_path: str) -> str:
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".csv":
        try:
            df = pd.read_csv(file_path)
            return df.to_string(index=False)
        except Exception as e:
            return f"Error reading CSV: {str(e)}"

    elif ext == ".txt":
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()
        except Exception as e:
            return f"Error reading TXT: {str(e)}"

    elif ext == ".pdf":
        try:
            with pdfplumber.open(file_path) as pdf:
                return "\n".join(page.extract_text() or "" for page in pdf.pages)
        except Exception:
            try:
                doc = fitz.open(file_path)
                return "\n".join(page.get_text() for page in doc)
            except Exception as e:
                return f"Error reading PDF: {str(e)}"
    
    return "Unsupported file type"
