# main.py
import os
from fastapi import FastAPI, Request
from pydantic import BaseModel
import pymongo
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Initialize the FastAPI app
app = FastAPI()

# Configure the Google AI client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Establish a connection to MongoDB Atlas
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("chatbotDB")
knowledge_collection = db.get_collection("knowledge")

# Define the data model for the incoming request
class ChatRequest(BaseModel):
    message: str

# Define the API endpoint for the chatbot
@app.post("/api/chat")
async def handle_chat(request: ChatRequest):
    user_message = request.message
    print(f"Received message: {user_message}")

    # --- CORE RAG LOGIC GOES ---

    # 1. Create an embedding of the user's message
    #    (Code to call the Gemini Embedding API)
    #    user_embedding = ...

    # 2. Perform a vector search in MongoDB Atlas
    #    (Code to run the $vectorSearch query using the user_embedding)
    #    context_chunks = ...

    # 3. Construct a prompt for the Gemini chat model
    #    prompt = f"Context: {context_chunks}\n\nQuestion: {user_message}"

    # 4. Call the Gemini chat model to get a response
    #    model = genai.GenerativeModel('gemini-1.5-flash')
    #    response = model.generate_content(prompt)
    #    ai_reply = response.text

    # For now, let's return a simple placeholder response
    ai_reply = f"You said: {user_message}. The AI logic is not yet implemented."

    return {"reply": ai_reply}

# A simple root endpoint to confirm the server is running
@app.get("/")
def read_root():
    return {"status": "Server is running"}


