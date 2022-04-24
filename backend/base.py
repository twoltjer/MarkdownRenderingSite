from flask import Flask, request
import markdown
import json

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response = {
        "name": "Thomas",
        "about": "Software engineer"
    }

    return response

@api.route('/convert', methods=['POST'])
def convert():
    if request.method == 'POST':
        resp_data = json.loads(request.data)
        md_input = resp_data['md_input']
        html = markdown.markdown(md_input)
        response = {
            "test": "test-resp",
            "md_html": html
        }
        return response