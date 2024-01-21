// Imports
const { Schema, model } = require("mongoose");

// Define the User Schema
const userSchema = new Schema({
    // The username of the user, a unique, required string with leading/trailing whitespaces trimmed
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    // The email of the user, a required, unique string with email format validation
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    // The array of thoughts associated with the user, containing references to Thought documents
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    }],
     // The array of friends associated with the user, containing references to other User documents
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
}, {
    // Configuration options for the schema
    toJSON: {
        virtuals: true, // Include virtual properties when converting the schema to JSON
    },
    id: false,  // Exclude the 'id' field when converting the schema to JSON
});

// Define a virtual property to calculate the friend count
userSchema.virtual("friendCount").get(function () {
    return this.friends.length; // Calculate the length of the friends array as the friend count
});

// Create the User model using the userSchema
const User = model("User", userSchema);

// Export the User model
module.exports = User;