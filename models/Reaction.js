// Imports
const { Schema, Types } = require("mongoose");

// Define the reaction sub-document schema for use in the Thought model
const reactionSchema = new Schema({
    // Unique identifier for the reaction, using Mongoose's ObjectId type
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(), // Automatically generate a new ObjectId as default value
    },
    // The body of the reaction, a required string with a maximum length of 280 characters
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
     // The username associated with the user who created the reaction, a required string
    username: {
        type: String,
        required: true,
    },
    // The timestamp indicating when the reaction was created, defaulting to the current date and time
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the reaction schema to be used in the Thought model
module.exports = reactionSchema;