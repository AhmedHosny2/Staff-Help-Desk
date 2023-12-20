import subprocess
import concurrent.futures

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

with concurrent.futures.ThreadPoolExecutor() as executor:
    # Submit each command to the executor
    futures = [executor.submit(run_command, command) for command in commands]

    # Wait for all commands to complete
    concurrent.futures.wait(futures)
