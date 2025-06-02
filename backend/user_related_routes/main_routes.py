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
    if "receivedQueryRequests" in user:
        for req in user["receivedQueryRequests"]:
            if "from_user_id" in req:
                req["from_user_id"] = str(req["from_user_id"])
            if "trip_id" in req:
                req["trip_id"] = str(req["trip_id"])
    if "sentQueryRequests" in user:
        for req in user["sentQueryRequests"]:
            if "to_user_id" in req:
                req["to_user_id"] = str(req["to_user_id"])
            if "trip_id" in req:
                req["trip_id"] = str(req["trip_id"])
    return jsonify({"user_data": user}), 200