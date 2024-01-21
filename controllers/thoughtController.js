// Imports User and Thought models from the "../models" directory
const { User, Thought } = require("../models");

// Thought Controller with methods for handling Thought-related operations
const thoughtController = {
    // Async function to get all Thoughts
    async getThoughts(req, res) {
        try {
            // Fetch all thoughts from the database
            const thoughts = await Thought.find();
            // Respond with a 200 status and the array of thoughts in JSON format
            res.status(200).json(thoughts);
        } catch (err) {
            // Handle errors by logging them and responding with a 500 status and an error message
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
// // Async function to get a single Thought by its ID
    async getThought(req, res) {
        try {
            // Find the thought by its ID using the parameters from the request
            const thought = await Thought.findById(req.params.thoughtId);

            // Check if the thought is not found, and return a 404 status with an appropriate message
            if (!thought) {
                return res.status(404).json({ message: "No thought found" });
            }

             // Respond with a 200 status and the found thought in JSON format
            res.status(200).json(thought);
        } catch (err) {
            // Handle errors by logging them and responding with a 500 status and an error message
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
// Async function to create a new thought
    async createThought(req, res) {
        try {
             // Create a new thought in the database using the request body
            const thought = await Thought.create(req.body);

            // Update the user associated with the thought by adding the thought's ID to the user's 'thoughts' array
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: { thoughts: thought._id } }, // Using $addToSet to avoid duplicate entries
                { runValidators: true, new: true } // Ensure validators are run, and get the updated user document
            );

            // Respond with a 200 status and JSON containing the created thought and updated user
            res.status(200).json({ thought, user });
        } catch (err) {
             // Handle errors by logging them and responding with a 500 status and an error message
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Async function to update a Thought by its ID
    async updateThought(req, res) {
        try {
            // Find and update the Thought by its ID with the data from the request body
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId, // ID of the thought to be updated, obtained from the request parameters
                { $set: req.body }, // Update the thought with the data from the request body
                { runValidators: true, new: true } // Ensure validators are run, and get the updated thought document
            );

            // Check if the thought is not found, and return a 404 status with an appropriate message
            if (!thought) {
                return res.status(404).json({ message: "Unable to update" });
            }

            // Respond with a 200 status and the updated thought in JSON format
            res.status(200).json(thought);
        } catch (err) {
            // Handle errors by logging them and responding with a 500 status and an error message
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
// Async function to delete a Thought by its ID
    async deleteThought(req, res) {
        try {
            // Find and delete the Thought by its ID
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

            // Check if the thought is not found, and return a 404 status with an appropriate message
            if (!thought) {
                return res.status(404).json({ message: "No thought with that ID" });
            }

            // Respond with a 200 status and a success message indicating the thought and associated reactions were deleted
            res.status(200).json({
                message: "Thought & associated reactions successfully deleted",
            });
        } catch (err) {
            // Handle errors by logging them and responding with a 500 status and an error message
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Async function to add a reaction to a Thought
    async addReaction(req, res) {
        try {
            // Find the Thought by its ID and update it by adding the provided reaction to the 'reactions' array
            const reaction = await Thought.findByIdAndUpdate(
                req.params.thoughtId,    // ID of the thought to add the reaction to, obtained from the request parameters
                { $addToSet: { reactions: req.body } }, // Use $addToSet to avoid duplicate reactions in the array
                { runValidators: true, new: true } // Ensure validators are run, and get the updated thought document
            );

            // Check if the thought is not found, and return a 404 status with an appropriate message
            if (!reaction) {
                return res.status(404).json({ message: "Cannot find thought" });
            }

            // Respond with a 200 status and the updated thought (now including the new reaction) in JSON format
            res.status(200).json(reaction);
        } catch (err) {
            // Handle errors by logging them and responding with a 500 status and an error message
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
// Async function to delete a reaction from a Thought
    async deleteReaction(req, res) {
        try {
            // Find the Thought by its ID and update it by pulling the specified reaction using its ID from the 'reactions' array
            const reaction = await Thought.findByIdAndUpdate(
                req.params.thoughtId,   // ID of the thought to delete the reaction from, obtained from the request parameters
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }  // Ensure validators are run, and get the updated thought document
            );

             // Check if the thought is not found, and return a 404 status with an appropriate message
            if (!reaction) {
                return res.status(404).json({ message: "Cannot find thought" });
            }

             // Respond with a 200 status and the updated thought (now without the deleted reaction) in JSON format
            res.status(200).json(reaction);
        } catch (err) {
            // Handle errors by logging them and responding with a 500 status and an error message
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};
// Exports
module.exports = thoughtController;