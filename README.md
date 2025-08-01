

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

The backend will be running at: http://127.0.0.1:8000


### Frontend Setup (React + Vite)

1. Navigate to the frontend directory:

```bash
cd datasage
```

2. Install dependancies

```bash
npm install
```

3. Start the development server

```bash

npm run dev
```

The frontend will be available at: http://localhost:3000


The live url is https://langchain-data-analysis.netlify.app