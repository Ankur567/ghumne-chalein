from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, jsonify
from db import users_collection, trips_collection
import datetime as dt
from flask_jwt_extended import create_access_token, get_jwt_identity
from bson import ObjectId

def dashboard():
    current_user_id = get_jwt_identity()
    user = users_collection.find_one({"_id": ObjectId(current_user_id)})
    if not user:
        return jsonify({"message": "User not found"}), 404
    user["_id"] = str(user["_id"])
    trips = trips_collection.find()
    trips_list = []
    for trip in trips:
        trip["_id"] = str(trip["_id"])
        trip["user_id"] = str(trip["user_id"])
        trips_list.append(trip)
    return jsonify({"user_data": user, "trips": trips_list}), 200