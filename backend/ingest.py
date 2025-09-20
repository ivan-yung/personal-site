import os
import re
import pymongo
import google.generativeai as genai
from dotenv import load_dotenv

# --- CONFIGURATION ---
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")
SOURCE_DATA_DIR = "project_data" 

# --- INITIALIZATION ---
print("Initializing clients...")
genai.configure(api_key=GEMINI_API_KEY)
client = pymongo.MongoClient(MONGO_URI)
db = client.get_database("chatbotDB")
knowledge_collection = db.get_collection("knowledge")
print("Initialization complete.")

# --- HELPER FUNCTIONS ---
def get_text_chunks(text, filename):
    """Selects a chunking strategy based on the filename."""
    if "about_me.md" in filename:
        # For the main resume, split by paragraphs for better context
        print(f"Using paragraph chunking for {filename}")
        return [chunk for chunk in text.split("\n\n") if chunk.strip()]
    else:
        # For detailed project files, split by H2 headings
        print(f"Using section chunking for {filename}")
        chunks = re.split(r'\n## ', text)
        processed_chunks = [chunks[0]]
        for chunk in chunks[1:]:
            processed_chunks.append(f"## {chunk}")
        return [chunk for chunk in processed_chunks if chunk.strip()]

def embed_text(text_chunks):
    """Generates embeddings for a list of text chunks."""
    try:
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
    print("Clearing existing data from the 'knowledge' collection...")
    knowledge_collection.delete_many({})
    
    for filename in os.listdir(SOURCE_DATA_DIR):
        if filename.endswith((".txt", ".md")):
            file_path = os.path.join(SOURCE_DATA_DIR, filename)
            print(f"Processing file: {file_path}...")
            
            with open(file_path, 'r', encoding='utf-8') as f:
                file_content = f.read()
            
            # Pass the filename to the chunking function
            chunks = get_text_chunks(file_content, filename)

            embeddings = embed_text(chunks)
            
            if embeddings and len(chunks) == len(embeddings):
                documents = []
                for i, chunk in enumerate(chunks):
                    documents.append({
                        "source": filename,
                        "text": chunk,
                        "embedding": embeddings[i]
                    })
                
                knowledge_collection.insert_many(documents)
                print(f"Successfully inserted {len(documents)} documents from {filename}.")
            else:
                print(f"Skipping insertion for {filename} due to embedding issues.")
    
    print("\nData ingestion complete!")
    print(f"Total documents in collection: {knowledge_collection.count_documents({})}")

# --- EXECUTION ---
if __name__ == "__main__":
    ingest_data()