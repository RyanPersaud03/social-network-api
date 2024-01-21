// Import the Express framework
const express = require("express");

// Import the database connection configuration
const db = require("./config/connection");

// Import the routes module
const routes = require("./routes");

// Get the current working directory
const cwd = process.cwd();

// Set the default port to 3001 or use the one provided by the environment
const PORT = process.env.PORT || 3001;
// Create an Express application
const app = express();

// Middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Attach the defined routes to the Express app
app.use(routes);

// Database connection established using Mongoose
db.once("open", () => {
  // Database connection is open, start the server

  // Start listening for incoming requests on the specified port
  app.listen(PORT, () => {
    // Server is successfully started, log a message to the console
    console.log(`Server running on port ${PORT}!`);
  });
});
