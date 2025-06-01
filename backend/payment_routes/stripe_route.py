import os
from flask import jsonify, request
import stripe
from dotenv import load_dotenv
from flask_jwt_extended import get_jwt_identity
from db import users_collection
from bson import ObjectId

load_dotenv()

stripe.api_key = os.getenv('STRIPE_API_KEY')

YOUR_DOMAIN = 'http://localhost:5173/'

def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': 'price_1RU0yiPDLLK6WQFhtWXnGg3K',
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + 'success',
            cancel_url=YOUR_DOMAIN + 'canceled',
        )
        return jsonify({'url': checkout_session.url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def change_subscribe_status():
    current_user_id = get_jwt_identity()
    users_collection.update_one(
        {"_id": ObjectId(current_user_id)},
        {"$set": {"isSubscribed": True}}
    )
    return jsonify({"message": "Subscription status changed"}), 200
