// Imports
const { User, Thought, Reaction } = require("../models");
const mongoose = require("mongoose");

// Import the connection from the configuration file
const connection = require("../config/connection");

// Seed Data
const users = [
    {
        username: "Morris",
        email: "morris@gmail.com",
        thought: [],
    },
    {
        username: "Shiva",
        email: "shiva@gmail.com",
        thought: [],
    },
    {
        username: "Winston",
        email: "winston@gmail.com",
        thought: [],
    },
    {
        username: "Luna",
        email: "winston@gmail.com",
        thought: [],
    },
    {
        username: "Rocky",
        email: "rocky@gmail.com",
        thought: [],
    },
    {
        username: "Milo",
        email: "milo@gmail.com",
        thought: [],
    },
];

// Log the connection information
console.log(connection);

// Connect to the server
connection.once("open", async () => {
    try {
        console.log("Connection Successful!");

        // Drop existing users
        await User.deleteMany({});

        // Add seed data to the database
        await User.collection.insertMany(users);

        console.table(users);
        console.info("Seeded Data!");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log("Connection closed.");
        process.exit(0);
    }
});