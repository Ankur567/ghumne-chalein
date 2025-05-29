from google import genai
from google.genai import types
from dotenv import load_dotenv
from flask import Response, request
import os

load_dotenv()
client = genai.Client(api_key=os.getenv("GENAI_API_KEY"))

def ask_gemini():
    data = request.json
    history = data.get("history", [])

    # Convert frontend history to Gemini-compatible format
    gemini_history = []
    for entry in history:
        if entry["type"] == "user":
            gemini_history.append(types.Content(
                role="user",
                parts=[types.Part(text=entry["message"])]
            ))
        elif entry["type"] == "bot" and entry["message"] not in ["Thinking...", "Oops! Something went wrong."]:
            gemini_history.append(types.Content(
                role="model",
                parts=[types.Part(text=entry["message"])]
            ))
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=gemini_history
    )

    return Response(response.text, mimetype="text/plain")
