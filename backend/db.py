from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# MongoDB connection string
mongo_uri = os.getenv("MONGODB_URI")
client = MongoClient(mongo_uri)

# Database and collection
db = client["ghumne-chalein"]
users_collection = db["users"]
trips_collection = db["trips"]