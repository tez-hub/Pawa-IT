from fastapi import FastAPI
from database import init_db
from routers import users, files, queries  # You can add more routers as needed
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI-Powered File Analysis API")

# Run database initialization on startup
@app.on_event("startup")
def on_startup():
    init_db()


# Allow CORS for frontend URL(s)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://langchain-data-analysis.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use ["*"] to allow all origins (not recommended for prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Register your routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(files.router, prefix="/files", tags=["Files"])
app.include_router(queries.router, prefix="/queries", tags=["Queries"])

# Optional root route
@app.get("/")
def read_root():
    return {"message": "Welcome to the AI-Powered File Analysis API!"}
