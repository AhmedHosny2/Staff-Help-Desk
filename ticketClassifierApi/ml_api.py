from flask import Flask, jsonify, request
from joblib import load
import pandas as pd

app = Flask(__name__)

# Load the trained model and the encoder
model = load('./saved_model/model.joblib')
encoder = load('./saved_model/encoder.joblib')

# # Read the input data
# input_data = pd.DataFrame([['low', 'network']], columns=['Priority', 'Type'])

# # One-hot encode the input data using the loaded encoder
# input_encoded = encoder.transform(input_data)

# # Make predictions using the loaded model
# predicted_agent = model.predict(input_encoded)
# print(predicted_agent)


@app.route('/api/assignTicket', methods=['POST'])
def assign_ticket():
   try:

      # Extract ticket information from the request
      data = request.get_json()
      priority = data['priority']
      ticket_type = data['type']

      # Read the input data
      input_data = pd.DataFrame([[str(priority), str(ticket_type)]], columns=['Priority', 'Type'])

      # One-hot encode the input data using the loaded encoder
      input_encoded = encoder.transform(input_data)

      # Make predictions using the loaded model
      predicted_agent = model.predict(input_encoded).tolist()

      print(predicted_agent[0])

      # Create a response with the predicted agent
      response = {
         'predicted_agent': predicted_agent[0]
      }

      return jsonify(response), 200

   except Exception as e:
      print(e)
      return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(port=5012)
