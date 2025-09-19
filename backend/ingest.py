import os
import pymongo
import google.generativeai as genai
from dotenv import load_dotenv

# --- CONFIGURATION ---
# Load environment variables from your .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")

# The folder containing your project/resume files (.txt or .md)
SOURCE_DATA_DIR = "project_data" 

# --- INITIALIZATION ---
print("Initializing clients...")
# Configure the Gemini API client
genai.configure(api_key=GEMINI_API_KEY)

# Configure the MongoDB client and select the database/collection
client = pymongo.MongoClient(MONGO_URI)
db = client.get_database("chatbotDB")
knowledge_collection = db.get_collection("knowledge")
print("Initialization complete.")

# --- HELPER FUNCTIONS ---
def get_text_chunks(text):
    """Splits text into smaller chunks, like paragraphs."""
    # A simple split by double newline, you can make this more sophisticated
    return [chunk for chunk in text.split("\n\n") if chunk.strip()]

def embed_text(text_chunks):
    """Generates embeddings for a list of text chunks."""
    try:
        # Using the new text-embedding-004 model from Google
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=text_chunks,
            task_type="RETRIEVAL_DOCUMENT"
        )
        return result['embedding']
    except Exception as e:
        print(f"An error occurred during embedding: {e}")
        return None

# --- MAIN LOGIC ---
def ingest_data():
    """Reads files, generates embeddings, and inserts them into MongoDB."""
    
    # First, clear the existing collection to avoid duplicates on re-runs
    print("Clearing existing data from the 'knowledge' collection...")
    knowledge_collection.delete_many({})

    # Process each file in the source directory
    for filename in os.listdir(SOURCE_DATA_DIR):
        if filename.endswith((".txt", ".md")):
            file_path = os.path.join(SOURCE_DATA_DIR, filename)
            print(f"Processing file: {file_path}...")

            with open(file_path, 'r', encoding='utf-8') as f:
                file_content = f.read()
            
            # 1. Chunk the text
            chunks = get_text_chunks(file_content)
            
            # 2. Generate embeddings for all chunks in the file
            embeddings = embed_text(chunks)
            
            if embeddings and len(chunks) == len(embeddings):
                # 3. Prepare documents for insertion
                documents = []
                for i, chunk in enumerate(chunks):
                    documents.append({
                        "source": filename,
                        "text": chunk,
                        "embedding": embeddings[i]
                    })
                
                # 4. Insert the documents into the collection
                knowledge_collection.insert_many(documents)
                print(f"Successfully inserted {len(documents)} documents from {filename}.")
            else:
                print(f"Skipping insertion for {filename} due to embedding issues.")

    print("\nData ingestion complete!")
    # Optional: Print the number of documents to verify
    print(f"Total documents in collection: {knowledge_collection.count_documents({})}")

# --- EXECUTION ---
if __name__ == "__main__":
    ingest_data()