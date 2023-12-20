import subprocess
import threading
import time

def run_command(command):
    try:
        print("Executing command: {}".format(command))
        return_code = subprocess.call(command, shell=True)
        if return_code != 0:
            raise subprocess.CalledProcessError(return_code, command)
        print("Command succeeded: {}".format(command))
    except subprocess.CalledProcessError as e:
        print("Error executing command {}: {}".format(command, e))

# List of commands to run in parallel
commands = [
    "cd chat && node index.js",
    "cd knowledgeBase && node index.js",
    "cd logging && node index.js",
    "cd notifications && node index.js",
    "cd tickets && node index.js",
    "cd users && node index.js",
    #"cd bot && node index.js",
    "cd middleware && node index.js",
    #"cd BackUp && node index.js",
    "vercel build"
]

# Function to run a command after a delay
def run_command_with_delay(command, delay):
    time.sleep(delay)
    run_command(command)

# Threads list
threads = []

# Adding a delay of 20 seconds before running a specific command
for i, command in enumerate(commands):
    if "vercel build" in command:
        # If the command contains "bot", add a 20-second delay before running it
        thread = threading.Thread(target=run_command_with_delay, args=(command, 20))
    else:
        # Otherwise, run the command without delay
        thread = threading.Thread(target=run_command, args=(command,))
    
    thread.start()
    threads.append(thread)

# Wait for all threads to complete
for thread in threads:
    thread.join()
