from flask import request, jsonify
from db import trips_collection, users_collection
import datetime as dt
from flask_jwt_extended import create_access_token, get_jwt_identity
from bson import ObjectId

def add_trip():
    current_user_id = get_jwt_identity()
    data = request.json
    print(data.get("placesToVisit"))
    trip_data = {
        "user_id": ObjectId(current_user_id),
        "home_location": data.get("homeLocation"),
        "from_date": data.get("fromDate"),
        "prefix": data.get("prefix"),
        "destination": data.get("destination"),
        "trip_start_date": data.get("tripStartDate"),
        "places_to_visit": data.get("placesToVisit"),
        "days": data.get("numberOfDays"),
        "number_of_people": data.get("numberOfPeople"),
        "budget": data.get("budget"),
        "imageName": data.get("imageName"),
        "createdAt": dt.datetime.now(),
    }
    trip_id = trips_collection.insert_one(trip_data).inserted_id
    return jsonify({"message": "Trip created", "trip_id": str(trip_id), "places": trip_data["places_to_visit"]}), 200

def get_all_trips():
    trips = trips_collection.find()
    trips_list = []
    for trip in trips:
        trip["_id"] = str(trip["_id"])
        trip["user_id"] = str(trip["user_id"])
        trips_list.append(trip)
    return jsonify({"trips": trips_list}), 200

def get_trip_by_home_location(home_location):
    current_user_id = get_jwt_identity()
    trips = trips_collection.find({"home_location": home_location})
    trips_list = []
    for trip in trips:
        trip["_id"] = str(trip["_id"])
        trip["user_id"] = str(trip["user_id"])
        if(trip["user_id"] != current_user_id):
            trips_list.append(trip)
    return jsonify({"trips": trips_list}), 200

def get_trip_by_id(tripId):
    trip = trips_collection.find_one({"_id": ObjectId(tripId)})
    if trip:
        trip["_id"] = str(trip["_id"])
        trip["user_id"] = str(trip["user_id"])
    return jsonify({"trip": trip}), 200

def delete_all_trips():
    trips_collection.delete_many({})
    return jsonify({"message": "All trips deleted"}), 200

def check_trip_requested_by_user(tripId):
    current_user_id = get_jwt_identity()
    current_user = users_collection.find_one({"_id": ObjectId(current_user_id)})
    for req in current_user.get("sentQueryRequests", []):
        if req.get("trip_id") == ObjectId(tripId):
            return jsonify({"requested": True}), 200
    return jsonify({"requested": False}), 400