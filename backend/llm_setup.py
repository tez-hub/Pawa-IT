
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

def get_gemini_chain():
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        google_api_key=os.getenv("GOOGLE_API_KEY")
       
    )

    prompt = ChatPromptTemplate.from_template("""
    You are a data analysis assistant. You are given the content of a data file and a user's question. Analyze the file and answer the question clearly.

    If the answer involves data that can be visualized (e.g., trends, comparisons, counts), return your response in the following JSON format:

    {{
    "graphable": true,
    "graph_type": "bar" | "line" | "pie" | "scatter",
    "labels": [list of labels],
    "values": [corresponding numeric values],
    "summary": "short human-readable explanation of the findings"
    }}

    If the answer is not graphable, return:

    {{
    "graphable": false,
    "summary": "Your answer in plain text."
    }}

    Data file content:
    {file_content}

    User question:
    {question}

    Your structured response:
    """)

    return prompt | llm
