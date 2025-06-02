from flask import request, jsonify
from db import users_collection
import datetime as dt
from flask_jwt_extended import create_access_token, get_jwt_identity
from bson import ObjectId

def send_request_to_owner():
    current_user_id = get_jwt_identity()
    data = request.json
    trip_id = data.get("tripId")
    trip_owner_id = data.get("userId")
    current_user = users_collection.find_one({"_id": ObjectId(current_user_id)})
    owner_request_entry = {
        "from_user_id": ObjectId(current_user_id),
        "trip_id": ObjectId(trip_id),
        "hasAccepted": False,
        "requested_at": dt.datetime.now()
    }
    users_collection.update_one(
        {"_id": ObjectId(trip_owner_id)},
        {"$push": {"receivedQueryRequests": owner_request_entry}}
    )
    user_request_entry = {
        "to_user_id": ObjectId(trip_owner_id),
        "trip_id": ObjectId(trip_id),
        "isAccepted": False,
        "requested_at": dt.datetime.now()
    }
    users_collection.update_one(
        {"_id": ObjectId(current_user_id)},
        {"$push": {"sentQueryRequests": user_request_entry}}
    )
    return jsonify({"message": "Request sent to trip owner"}), 200

def fetch_query_requests():
    current_user_id = get_jwt_identity()
    current_user = users_collection.find_one({"_id": ObjectId(current_user_id)})
    if "receivedQueryRequests" in current_user:
        for req in current_user["receivedQueryRequests"]:
            if "from_user_id" in req:
                req["from_user_id"] = str(req["from_user_id"])
            if "trip_id" in req:
                req["trip_id"] = str(req["trip_id"])
    return jsonify({"requests": current_user.get("receivedQueryRequests", [])}), 200

def accept_query_request():
    current_user_id = get_jwt_identity()  # Trip owner
    data = request.json
    from_user_id = data.get("from_user_id")
    trip_id = data.get("trip_id")
    if not from_user_id or not trip_id:
        return jsonify({"error": "Missing from_user_id or trip_id"}), 400
    users_collection.update_one(
        {"_id": ObjectId(current_user_id), "receivedQueryRequests": {
            "$elemMatch": {
                "from_user_id": ObjectId(from_user_id),
                "trip_id": ObjectId(trip_id)
            }
        }},
        {"$set": {
            "receivedQueryRequests.$.hasAccepted": True
        }}
    )
    users_collection.update_one(
        {"_id": ObjectId(from_user_id), "sentQueryRequests": {
            "$elemMatch": {
                "to_user_id": ObjectId(current_user_id),
                "trip_id": ObjectId(trip_id)
            }
        }},
        {"$set": {
            "sentQueryRequests.$.isAccepted": True
        }}
    )
    return jsonify({"message": "Query request accepted"}), 200

def get_owner_details():
    current_user_id = get_jwt_identity()
    current_user = users_collection.find_one({"_id": ObjectId(current_user_id)})
    data = request.json
    owner_id = data.get("user_id")
    trip_id = data.get("trip_id")

    if not owner_id or not trip_id:
        return jsonify({"message": "Missing user_id or trip_id"}), 400

    try:
        owner = users_collection.find_one({"_id": ObjectId(owner_id)})
    except:
        return jsonify({"message": "Invalid owner ID"}), 400

    if not owner:
        return jsonify({"message": "Owner not found"}), 404

    for req in current_user.get("sentQueryRequests", []):
        if req.get("trip_id") == ObjectId(trip_id):
            if req.get("isAccepted"):
                return jsonify({
                    "email": owner.get("email"),
                    "phone": owner.get("phone")
                }), 200

    return jsonify({"message": "Not accepted yet"}), 400
