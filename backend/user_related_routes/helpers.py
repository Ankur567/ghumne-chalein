from db import users_collection

def get_user_by_username(username):
    return users_collection.find_one({"username": username})