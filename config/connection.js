// Import the necessary modules from the 'mongoose' library
const { connect, connection } = require("mongoose");

// Define the URI for the MongoDB database. It uses the environment variable 'MONGO_URI' if available,
// otherwise, it defaults to a local MongoDB instance on port 27017 and the database name 'socialDB'.
const connectiondb = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialDB";

// Connect Mongoose to the MongoDB database using the URI specified
connect(connectiondb);

// Export the Mongoose connection object to be used in other parts of the application
module.exports = connection;