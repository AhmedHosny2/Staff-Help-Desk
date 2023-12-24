import subprocess
import threading

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
    #"cd chat && node index.js",
    "cd knowledgeBase && node index.js",
    "cd logging && node index.js",
    "cd notifications && node index.js",
    "cd tickets && node index.js",
    "cd users && node index.js",
    "cd bot && node index.js",
    "cd middleware && node index.js",
    #"cd BackUp && node index.js",
]


threads = []

for command in commands:
    thread = threading.Thread(target=run_command, args=(command,))
    thread.start()
    threads.append(thread)

# Wait for all threads to complete
for thread in threads:
    thread.join()
