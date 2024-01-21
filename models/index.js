 // Import User and Thought models from their respective files
const User = require("./User"); // Import the User model from the "User.js" file
const Thought = require("./Thought"); // Import the Thought model from the "Thought.js" file

// Export an object containing references to the User and Thought models
module.exports = { User, Thought };