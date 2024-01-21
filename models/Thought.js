// Imports
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Define the Thought Schema
const thoughtSchema = new Schema({
    // The text content of the thought, a required string with a maximum length of 280 characters and a minimum length of 1 character
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    // The timestamp indicating when the thought was created, defaulting to the current date and time
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // The username associated with the user who created the thought, a required string
    username: {
        type: String,
        required: true,
    },
    // The array of reactions associated with the thought, using the reactionSchema defined in a separate file
    reactions: [reactionSchema],
}, {
    // Configuration options for the schema
    toJSON: {
        virtuals: true, // Include virtual properties when converting the schema to JSON
    },
    id: false, // Exclude the 'id' field when converting the schema to JSON
});

// Define a virtual property to calculate the reaction count
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;   // Calculate the length of the reactions array as the reaction count
});

// Create the Thought model using the thoughtSchema
const Thought = model("Thought", thoughtSchema);

// Export the Thought model
module.exports = Thought;
