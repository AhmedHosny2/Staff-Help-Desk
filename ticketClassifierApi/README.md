# Dependencies (Manually):

pip install Flask
pip install pandas
pip install joblib
pip install scikit-learn

# 1) Write this in cmd in the ticketClassifier directory

python -m venv venv

# 2) Write this in cmd in the ticketClassifier directory (We can skip this step)

.\venv\Scripts\activate

# 3) Write this in cmd in the ticketClassifier directory

pip install -r requirements.txt

# 4) Write this in cmd in the ticketClassifier directory --> This will run the api service

python ml_api.py

# This will deactivate the venv environment (We can skip this step)

deactivate
