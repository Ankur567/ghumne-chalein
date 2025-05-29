import os
from flask import jsonify
import stripe
from dotenv import load_dotenv

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
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
        )
        return jsonify({'url': checkout_session.url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500