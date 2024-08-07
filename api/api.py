from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import traceback
from pyresparser import ResumeParser

app = Flask(__name__)

# Enable CORS for all routes and allow requests from 'http://localhost:3000'
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/data', methods=['POST'])
def process_data():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['resume']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Ensure the uploads directory exists
        upload_folder = 'uploads'
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        
        file_path = os.path.join(upload_folder, file.filename)
        file.save(file_path)

        # Parse the resume using pyresparser
        data = ResumeParser(file_path).get_extracted_data()

        # Prepare the result to be returned
        result = {
            'name': data.get('name'),
            'email': data.get('email'),
            'mobile_number': data.get('mobile_number'),
            'skills': data.get('skills'),
            'college_name': data.get('college_name'),
            'degree': data.get('degree'),
            'designation': data.get('designation'),
            'company_names': data.get('company_names'),
            'no_of_pages': data.get('no_of_pages'),
            'total_experience': data.get('total_experience')
        }

        return jsonify(result)
    
    except Exception as e:
        # Log the traceback for debugging
        traceback.print_exc()
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)