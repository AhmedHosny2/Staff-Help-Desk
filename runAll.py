import subprocess
import concurrent.futures

def run_command(command):
    try:
        print(f"Executing command: {command}")
        subprocess.run(command, shell=True, check=True)
        print(f"Command succeeded: {command}")
    except subprocess.CalledProcessError as e:
        print(f"Error executing command {command}: {e}")

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
