

# 📊 DataSage – Data Analysis with FastAPI & React

DataSage is a full-stack data analysis web application built with **FastAPI** on the backend and **React** on the frontend. It allows users to upload datasets and ask questions, receiving intelligent, structured answers using advanced AI models.

---

## 🚀 Features

- Upload CSV or Excel files
- Ask data-related questions in natural language
- AI-powered structured responses (with optional visualizations)
- FastAPI backend
- React frontend with Vite

---

## 🛠️ Getting Started

### ⚙️ Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a Virtual Environment.
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

```

3. Install dependancies.

```bash

pip install -r requirements.txt

```

4. Start the development server

```bash

uvicorn main:app --reload

```

