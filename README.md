# Project Overview

This project is a microservices-based application designed to handle different aspects of a help desk system. Each microservice corresponds to a specific functionality, and communication between them is achieved through predefined ports.

## Microservices and Ports

- Users Microservice: Port 5001
- Tickets Microservice: Port 5002
- Notifications Microservice: Port 5003
- Chat Microservice: Port 5004
- Middleware Microservice: Port 5005

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
   - For each service, run the following commands:
     ```bash
     cd [service_folder]
     npm i
     npm start
     ```

4. **Testing Endpoints:**
   - Each microservice provides a route to retrieve all data from its respective database.
   - Use the following GET requests for testing:
     - Users: http://localhost:5001/user
     - Tickets: http://localhost:5002/ticket
     - Notifications: http://localhost:5003/notification
     - Chat: http://localhost:5004/chat

## non-implemented Models

three additional models are available but has no place to go:
- Logs Table


Feel free to reach out for any questions or assistance. Happy coding!
