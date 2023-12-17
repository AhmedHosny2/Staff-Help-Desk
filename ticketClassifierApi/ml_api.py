from flask import Flask, jsonify, request
from joblib import load
import pandas as pd

app = Flask(__name__)

# Load the trained model and the encoder and the agent_order
model = load('./saved_model/model_rf.joblib')
encoder = load('./saved_model/encoder_rf.joblib')
agent_order = load('./saved_model/agent_order_rf.joblib')

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
        predicted_probabilities = model.predict_proba(input_encoded)[0]

        # Sort the predicted agents by probability
        #sorted_agents = [agent for _, agent in sorted(zip(predicted_probabilities, agent_order), reverse=True)]
        sorted_agents = ['agent1', 'agent2', 'agent3']


        # Create a response with the predicted agents and their probabilities
        response = {
            'predicted_agents': [{'agent': agent, 'probability': prob} for agent, prob in zip(sorted_agents, predicted_probabilities)]
        }

        return jsonify(response), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(port=5012)
