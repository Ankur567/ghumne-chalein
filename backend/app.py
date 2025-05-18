from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required
)
from dotenv import load_dotenv
import os
from authlib.integrations.flask_client import OAuth
from user_related_routes.auth_routes import signup, signin, check_token
from user_related_routes.main_routes import dashboard
from trip_related_routes.main_routes import add_trip, get_all_trips, delete_all_trips, get_trip_by_home_location

load_dotenv() 

app = Flask(__name__)
app.secret_key = os.getenv("APP_SECRET_KEY")
CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "https://ghumne-chalein.vercel.app"
        ]
    }
})

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

@app.route("/signup", methods=["POST"])
def signUp():
    return signup()

@app.route("/login", methods=["POST", "OPTIONS"])
def signIn():
    return signin()

@app.route("/checkToken", methods=["GET"])
@jwt_required()
def checkToken():
    return check_token()

@app.route("/dashboard", methods=["GET"])
@jwt_required()
def dashBoard():
    return dashboard()

@app.route("/addTrip", methods=["POST"])
@jwt_required()
def addTrip():
    return add_trip()

@app.route("/getAllTrips", methods=["GET"])
def getAllTrips():
    return get_all_trips()

@app.route("/getTripByHomeLocation/<home_location>", methods=["GET"])
@jwt_required()
def getTripByHomeLocation(home_location):
    return get_trip_by_home_location(home_location)

@app.route("/deleteAllTrips", methods=["DELETE"])
def deleteAllTrips():
    return delete_all_trips()

port = int(os.environ.get("PORT", 5000))
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)