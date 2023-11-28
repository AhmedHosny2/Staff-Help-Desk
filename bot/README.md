#  Abu Obaida  Bot

## Overview


Abu Obaida Bot is a conversational chatbot built using BT (Bot Technology). The primary focus is on providing chat completion based on a predefined set of conversations. This README outlines the project structure and how the conversation threads are managed.

## Project Hierarchy

The project follows a simple hierarchy where a thread is created for each conversation initiated by the user. To maintain context and completion progress, user information and thread details are stored in a database. The message content is managed through the Shot API, eliminating the need to store messages internally.

## Database Usage

### User Information
- User ID
- Thread ID (if assigned)

### Thread Information
- Thread ID
- Timestamp of creation
- Last active timestamp

## Thread Management

- Each conversation initiated by the user corresponds to a thread.
- If a user already has an active thread, the bot will continue the conversation within that thread.
- Threads are reset under the following conditions:
  - Exceeding a defined time limit (e.g., three days).
  - A user initiates a conversation without an assigned thread; a new thread is created in this case.

