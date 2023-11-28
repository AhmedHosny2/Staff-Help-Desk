require("dotenv").config();
const { spawn } = require("child_process");
const path = require("path");
const password = process.env.DB_PASSWORD;

// Specify the MongoDB URI
const mongoUri = `mongodb+srv://staffhelpdesk0:${password}@cluster0.p8xq0a1.mongodb.net/SEProjectDB?retryWrites=true&w=majority`;

// Get the current directory of the script
const currentDirectory = __dirname;

// Build the mongodump command
const mongodumpCommand = "mongodump";
const args = [
  `--uri=${mongoUri}`,
  "--gzip", // Add the --gzip option separately
];

// Set the output directory to the current directory
const outputDirectory = path.join(currentDirectory, "dump");
args.push(`--out=${outputDirectory}`);

// Spawn the mongodump process
const mongodumpProcess = spawn(mongodumpCommand, args);

// Handle events from the mongodump process
mongodumpProcess.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

mongodumpProcess.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

mongodumpProcess.on("close", (code) => {
  console.log(`mongodump process exited with code ${code}`);
});

mongodumpProcess.on("error", (err) => {
  console.error("Failed to start mongodump process:", err);
});
