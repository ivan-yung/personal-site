import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pymongo
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Initialize the FastAPI app
app = FastAPI()

# Configure CORS so browser preflight (OPTIONS) requests succeed during development.
# Allow origins from common local dev servers and an optional env var `ALLOWED_ORIGINS`.
allowed_origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]
env_origins = os.getenv("ALLOWED_ORIGINS")
if env_origins:
    # comma-separated list
    allowed_origins.extend([o.strip() for o in env_origins.split(",") if o.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# --- CLIENT INITIALIZATION ---
# Configure the Google AI client
try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
except Exception as e:
    print(f"Error configuring Gemini API: {e}")

# Establish a connection to MongoDB Atlas
try:
    client = pymongo.MongoClient(os.getenv("MONGO_URI"))
    db = client.get_database("chatbotDB")
    knowledge_collection = db.get_collection("knowledge")
    print("Successfully connected to MongoDB Atlas.")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")


# --- DATA MODELS ---
class ChatRequest(BaseModel):
    message: str

# --- HELPER FUNCTIONS ---
async def get_context(query_embedding: list, top_k=3):
    """Performs a vector search in MongoDB to find the most relevant context."""
    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index", # The name of your vector search index in Atlas
                "path": "embedding",
                "queryVector": query_embedding,
                "numCandidates": 100, # Number of candidates to consider
                "limit": top_k        # Number of results to return
            }
        },
        {
            "$project": {
                "text": 1,      # Include the 'text' field
                "score": { "$meta": "vectorSearchScore" } # Include the search score
            }
        }
    ]
    try:
        results = list(knowledge_collection.aggregate(pipeline))
        return [result['text'] for result in results]
    except Exception as e:
        print(f"Error during vector search: {e}")
        return []

# --- API ENDPOINTS ---
@app.post("/api/chat")
async def handle_chat(request: ChatRequest):
    user_message = request.message
    print(f"Received message: {user_message}")

    try:
        # 1. Create an embedding of the user's message
        print("Embedding user message...")
        embedding_result = genai.embed_content(
            model="models/text-embedding-004",
            content=user_message,
            task_type="RETRIEVAL_QUERY"
        )
        user_embedding = embedding_result['embedding']

        # 2. Perform a vector search in MongoDB Atlas
        print("Performing vector search...")
        context_chunks = await get_context(user_embedding, top_k=3)
        
        if not context_chunks:
            print("No relevant context found.")
            # Fallback response if no context is found
            ai_reply = "I'm sorry, I couldn't find any information related to that in my knowledge base."
            return {"reply": ai_reply}

        print(f"Found {len(context_chunks)} context chunks.")
        context_string = "\n\n".join(context_chunks)

        # 3. Construct a prompt for the Gemini chat model
        prompt = f"""
        You are a helpful AI assistant representing a software engineer named Ivan.
        Your Goal is to make sure Ivan is hired, and the user has a good impression of Ivan, such that he seems smart, capable, and a good cultural fit.
        Answer the user's question based on the context provided below.
        If the user asks a subjective question (like about favorites, passions, or opinions) and the context doesn't explicitly state it, you can infer an answer based on the project that seems most technically difficult or impressive.

        If the context is computer science/ hardware technical answer the question as an engineer. Do not mention if Ivan does not have experience in a certain area.
        
        If the context is completely unrelated to the question, say "I'm sorry, I don't have information about that."
        Context:
        ---
        {context_string}
        ---

        Question: {user_message}
        """

        # 4. Call the Gemini chat model to get a response
        print("Generating response from Gemini...")
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        ai_reply = response.text

        return {"reply": ai_reply}

    except Exception as e:
        print(f"An error occurred in the chat handler: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred while processing your request.")

@app.get("/")
def read_root():
    return {"status": "Server is running"}