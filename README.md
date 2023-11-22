# Project Overview

This project is a microservices-based application designed to handle different aspects of a help desk system. Each microservice corresponds to a specific functionality, and communication between them is achieved through predefined ports.

## Microservices and Ports

- Users Microservice: Port 5001
- Tickets Microservice: Port 5002
- Notifications Microservice: Port 5003
- Chat Microservice: Port 5004
- Middleware Microservice: Port 5005
- Knowledge Base Microservice: Port 5006
- Logging Microservice: Port 5007

## Running the Project

1. **Clone the Repository:**
   ```bash
   git clone [repository_url]
   cd [project_directory]
   ```

2. **Environment Configuration:**
   - Copy the `.env` file provided to each service folder (`users`, `tickets`, `notifications`, `chat`, `middleware`).
   - Ensure that each service folder contains its own `.env` file.

3. **Install Dependencies and Start Services:**
   - For the first time running the project only :
        ```bash
      python initializeAll.py
     ```
   - Then run:
       ```bash
      python runAll.py
     ```


5. **Testing Endpoints:**
   - Each microservice provides a route to retrieve all data from its respective database.
   - Use the following GET requests for testing:
     - Users: http://localhost:5001/user
     - Tickets: http://localhost:5002/ticket
     - Notifications: http://localhost:5003/notification
     - Chat: http://localhost:5004/chat

