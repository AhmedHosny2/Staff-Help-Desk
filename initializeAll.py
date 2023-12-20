import subprocess
import threading
import os

def load_env_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            for line in file:
                # Remove leading and trailing whitespaces and split the line into key-value pairs
                key, value = map(str.strip, line.split('=', 1))
                os.environ[key] = value
        print('Environment variables loaded from')
    except Exception as e:
        print('Error loading environment variables')

# Specify the path to the .env file
env_file_path = '.env'

# Load environment variables from the file
load_env_from_file(env_file_path)

CLIENT_URL = os.getenv('CLIENT_URL')
CONNECTION_URL = os.getenv('CONNECTION_URL')
ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET')
REFRESH_TOKEN_SECRET = os.getenv('REFRESH_TOKEN_SECRET')
SESSION_SECRET = os.getenv('SESSION_SECRET')
DOMAIN = os.getenv('DOMAIN')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
DESKMATE_SENDGRID_API_KEY = os.getenv('DESKMATE_SENDGRID_API_KEY')
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
IPGEOLOCATION_API_KEY = os.getenv('IPGEOLOCATION_API_KEY')

def write_env_file(folder_path, env_data):
    try:
        with open(os.path.join(folder_path, '.env'), 'w') as env_file:
            for key, value in env_data.items():
                env_file.write(f'{key}={value}\n')
        print('.env file successfully created at {}'.format(os.path.join(folder_path, '.env')))
    except Exception as e:
        print('Error: {}'.format(e))

# Create the "users" folder and write .env file
users_folder_path = 'users'
write_env_file(users_folder_path, {
    'CLIENT_URL': CLIENT_URL,
    'PORT': '5001',
    'CONNECTION_URL': CONNECTION_URL,
    'ACCESS_TOKEN_SECRET': ACCESS_TOKEN_SECRET,
    'REFRESH_TOKEN_SECRET': REFRESH_TOKEN_SECRET,
    'DOMAIN': DOMAIN
})

# Create the "ticket" folder and write .env file
ticket_folder_path = 'tickets'
write_env_file(ticket_folder_path, {
    'CLIENT_URL': CLIENT_URL,
    'PORT': '5002',
    'CONNECTION_URL': CONNECTION_URL,
    'ACCESS_TOKEN_SECRET': ACCESS_TOKEN_SECRET,
    'REFRESH_TOKEN_SECRET': REFRESH_TOKEN_SECRET,
    'DOMAIN': DOMAIN,
    'OPENAI_API_KEY':OPENAI_API_KEY,
    'DESKMATE_SENDGRID_API_KEY':DESKMATE_SENDGRID_API_KEY
})

# Create the "notifications" folder and write .env file
ticket_folder_path = 'notifications'
write_env_file(ticket_folder_path, {
    'CLIENT_URL': CLIENT_URL,
    'PORT': '5003',
    'CONNECTION_URL': CONNECTION_URL,
    'ACCESS_TOKEN_SECRET': ACCESS_TOKEN_SECRET,
    'REFRESH_TOKEN_SECRET': REFRESH_TOKEN_SECRET,
    'DOMAIN': DOMAIN,
})

# Create the "chat" folder and write .env file
users_folder_path = 'chat'
write_env_file(users_folder_path, {
    'CLIENT_URL': CLIENT_URL,
    'PORT': '5004',
    'CONNECTION_URL': CONNECTION_URL,
    'ACCESS_TOKEN_SECRET': ACCESS_TOKEN_SECRET,
    'REFRESH_TOKEN_SECRET': REFRESH_TOKEN_SECRET,
    'DOMAIN': DOMAIN
})

# Create the "middleware" folder and write .env file
ticket_folder_path = 'middleware'
write_env_file(ticket_folder_path, {
    'CLIENT_URL': CLIENT_URL,
    'PORT': '5005',
    'CONNECTION_URL': CONNECTION_URL,
    'ACCESS_TOKEN_SECRET': ACCESS_TOKEN_SECRET,
    'REFRESH_TOKEN_SECRET': REFRESH_TOKEN_SECRET,
    'DOMAIN': DOMAIN,
    'DESKMATE_SENDGRID_API_KEY':DESKMATE_SENDGRID_API_KEY,
    'CLIENT_ID':CLIENT_ID,
    'CLIENT_SECRET':CLIENT_SECRET,
    'SESSION_SECRET':SESSION_SECRET
})

# Create the "knowledgeBase" folder and write .env file
users_folder_path = 'knowledgeBase'
write_env_file(users_folder_path, {
    'CLIENT_URL': CLIENT_URL,
    'PORT': '5006',
    'CONNECTION_URL': CONNECTION_URL,
    'ACCESS_TOKEN_SECRET': ACCESS_TOKEN_SECRET,
    'REFRESH_TOKEN_SECRET': REFRESH_TOKEN_SECRET,
    'DOMAIN': DOMAIN
})

# Create the "logging" folder and write .env file
ticket_folder_path = 'logging'
write_env_file(ticket_folder_path, {
    'CLIENT_URL': CLIENT_URL,
    'PORT': '5007',
    'CONNECTION_URL': CONNECTION_URL,
    'ACCESS_TOKEN_SECRET': ACCESS_TOKEN_SECRET,
    'REFRESH_TOKEN_SECRET': REFRESH_TOKEN_SECRET,
    'DOMAIN': DOMAIN,
    'IPGEOLOCATION_API_KEY':IPGEOLOCATION_API_KEY,
})

# Create the "bot" folder and write .env file
ticket_folder_path = 'bot'
write_env_file(ticket_folder_path, {
    'CLIENT_URL': CLIENT_URL,
    'PORT': '5008',
    'CONNECTION_URL': CONNECTION_URL,
    'ACCESS_TOKEN_SECRET': ACCESS_TOKEN_SECRET,
    'REFRESH_TOKEN_SECRET': REFRESH_TOKEN_SECRET,
    'DOMAIN': DOMAIN,
    'OPENAI_API_KEY':OPENAI_API_KEY,
    'DESKMATE_SENDGRID_API_KEY':DESKMATE_SENDGRID_API_KEY
})


def run_command(command):
    try:
        print("Executing command: {}".format(command))
        subprocess.run(command, shell=True, check=True)
        print("Command succeeded: {}".format(command))
    except subprocess.CalledProcessError as e:
        print("Error executing command {}: {}".format(command, e))

# List of commands to run in parallel
commands = [
    "cd chat && npm install",
    "cd knowledgeBase && npm install",
    "cd logging && npm install",
    "cd notifications && npm install",
    "cd tickets && npm install",
    "cd users && npm install",
    "cd bot && npm install",
    "cd middleware && npm install",
    "cd BackUp && npm install",
]

threads = []

for command in commands:
    thread = threading.Thread(target=run_command, args=(command,))
    thread.start()
    threads.append(thread)

# Wait for all threads to complete
for thread in threads:
    thread.join()

