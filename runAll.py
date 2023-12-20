import subprocess
import threading

def run_command(command):
    try:
        print("Executing command: {}".format(command))
        subprocess.run(command, shell=True, check=True)
        print("Command succeeded: {}".format(command))
    except subprocess.CalledProcessError as e:
        print("Error executing command {}: {}".format(command, e))

# List of commands to run in parallel
commands = [
    "cd chat && npm start",
    "cd knowledgeBase && npm start",
    "cd logging && npm start",
    "cd notifications && npm start",
    "cd tickets && npm start",
    "cd users && npm start",
    #"cd bot && npm start",
    "cd middleware && npm start",
    #"cd BackUp && npm start",
]

threads = []

for command in commands:
    thread = threading.Thread(target=run_command, args=(command,))
    thread.start()
    threads.append(thread)

# Wait for all threads to complete
for thread in threads:
    thread.join()
