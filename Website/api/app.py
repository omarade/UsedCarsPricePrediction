from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the pipeline
pipeline = joblib.load("car_price_prediction_pipeline.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request
    data = request.get_json(force=True)
    
    # Create a DataFrame from the input data
    input_data = pd.DataFrame([data])
    
    # Make predictions
    prediction = pipeline.predict(input_data)
    
    # Return the prediction as JSON
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)