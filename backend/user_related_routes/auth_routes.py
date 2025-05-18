from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, jsonify
from db import users_collection
from user_related_routes.helpers import get_user_by_username
import datetime as dt
from flask_jwt_extended import create_access_token, get_jwt_identity
from bson import ObjectId

def signup():
    data = request.json
    username = data.get("username")
    fullname = data.get("fullname")
    email = data.get("email")
    password = data.get("password")
    homeLocation = data.get("homeLocation")

    if get_user_by_username(username):
        return jsonify({"msg": "Username already exists"}), 409

    hashed_password = generate_password_hash(password)
    user_id = users_collection.insert_one({
        "username": username,
        "fullname": fullname,
        "email": email,
        "password": hashed_password,
        "homeLocation": homeLocation,
        "createdAt": dt.datetime.now(),
    }).inserted_id

    return jsonify({"msg": "User created", "user_id": str(user_id)}), 201

def signin():
    if request.method == "OPTIONS":
        return jsonify({"msg": "CORS preflight response"}), 200
    data = request.json
    username = data.get("username")
    password = data.get("password")
    user = get_user_by_username(username)
    print(f"Password valid: {check_password_hash(user['password'], password)}")
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"msg": "Invalid credentials"}), 401

    token = create_access_token(
        identity=str(user["_id"]), 
        expires_delta=dt.timedelta(minutes=30)
    )
    return jsonify({
        'message': 'Login successful',
        'access_token': token
    }), 200

def check_token():
    current_user_id = get_jwt_identity()
    user = users_collection.find_one({"_id": ObjectId(current_user_id)})
    if not user:
        return jsonify({"message": "Token is invalid"}), 400
    return jsonify({"message": "Token is valid"}), 200