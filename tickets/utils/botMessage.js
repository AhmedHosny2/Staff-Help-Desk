exports.tickets = `
Input: {"category": "hardware", "description": "I have very urgent request, my desktop is not turning on."}
Output: high
Input: {"category": "hardware", "description": "My laptop is running slow, and I need it for an important presentation."}
Output: medium
Input: {"category": "hardware", "description": "The server in our office is down, and we can't access critical files."}
Output: high
Input: {"category": "hardware", "description": "There's an issue with the networking equipment in our conference room."}
Output: medium
Input: {"category": "hardware", "description": "My printer crashed, and I need to print important documents."}
Output: low
Input: {"category": "software", "description": "I'm facing issues with the operating system; it keeps freezing."}
Output: high
Input: {"category": "software", "description": "The custom software we use is not functioning correctly."}
Output: high
Input: {"category": "software", "description": "There's an integration problem with our CRM system and email software."}
Output: medium
Input: {"category": "software", "description": "I can't access the application software needed for my project."}
Output: medium
Input: {"category": "network", "description": "I'm unable to send or receive emails; urgent help needed!"}
Output: high
Input: {"category": "network", "description": "We're experiencing internet connection problems in the entire office."}
Output: high
Input: {"category": "network", "description": "There are errors while trying to access our company website."}
Output: medium
`;

