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
from trip_related_routes.main_routes import add_trip, get_all_trips, delete_all_trips, get_trip_by_home_location, get_trip_by_id
from gemini_routes.gemini import ask_gemini
from payment_routes.stripe_route import create_checkout_session, change_subscribe_status
from user_related_routes.know_more_routes import send_request_to_owner, fetch_query_requests, accept_query_request, get_owner_details

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

@app.route("/getTripById/<tripId>", methods=["GET"])
@jwt_required()
def getTripById(tripId):
    return get_trip_by_id(tripId)

@app.route("/deleteAllTrips", methods=["DELETE"])
def deleteAllTrips():
    return delete_all_trips()

@app.route('/askGemini', methods=["POST"])
@jwt_required()
def askGemini():
    return ask_gemini()

@app.route('/createCheckoutSession', methods=['POST'])
@jwt_required()
def createCheckoutSession():
    return create_checkout_session()

@app.route('/changeSubscribeStatus', methods=['POST'])
@jwt_required()
def changeSubscribeStatus():
    return change_subscribe_status()

@app.route('/sendrequestToOwner', methods=['POST'])
@jwt_required()
def sendrequestToOwner():
    return send_request_to_owner()

@app.route('/fetchQueryRequests', methods=['GET'])
@jwt_required()
def fetchQueryRequests():
    return fetch_query_requests()

@app.route('/acceptQueryRequest', methods=['POST'])
@jwt_required()
def acceptQueryRequest():
    return accept_query_request()

@app.route('/getOwnerDetails', methods=['POST'])
@jwt_required()
def getOwnerDetails():
    return get_owner_details()

port = int(os.environ.get("PORT", 5002))
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)