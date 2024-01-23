// Imports User and Thought models from the "../models" directory
const { User, Thought } = require("../models");

// User Controller with methods for handling User-related operations
const userController = {
    // Async function to get all users and populate their thoughts and friends
    async getUsers(req, res) {
        try {
            // Fetch all users from the database, populating their thoughts and friends
            const users = await User.find()
                .populate({ path: "thoughts", select: "-__v" }) // Populate the 'thoughts' field, excluding the '__v' property
                .populate({ path: "friends", select: "-__v" }); // Populate the 'friends'

                // Respond with a 200 status and the array of users in JSON format
            res.status(200).json(users);
        } catch (err) {
            // Handle errors by logging them and responding with a 500 status and an error message
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Get user by ID controller method
    async getUser(req, res) {
        try {
            // Find the user by its ID and populate their thoughts and friends
            const user = await User.findById(req.params.userId)
                .populate({ path: "thoughts", select: "-__v" }) // Populate the 'thoughts' field, excluding the '__v' property
                .populate({ path: "friends", select: "-__v" }); // Populate the 'friends' 

             // Check if the user is not found, and return a 404 status with an appropriate message
            if (!user) {
                return res.status(404).json({ message: "No user with that ID" });
            }

            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Create user controller method
    async createUser(req, res) {
        try {
            // Create a new user in the database using the request body
            const user = await User.create(req.body);
            // Respond with a 200 status and the created user in JSON format
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Update user controller method
    async updateUser(req, res) {
        try {
            // Find and update the user by its ID with the data from the request body
            const user = await User.findByIdAndUpdate(
                req.params.userId,  // ID of the user to be updated, obtained from the request parameters
                { $set: req.body }, // Update the user with the data from the request body
                { runValidators: true, new: true }  // Ensure validators are run, and get the updated user document
            );

             // Check if the user is not found, and return a 404 status with an appropriate message
            if (!user) {
                return res.status(404).json({ message: "No user with this ID was found" });
            }

            // Respond with a 200 status and the updated user in JSON format
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Delete user controller method
    async deleteUser(req, res) {
        try {
             // Find and delete the user by its ID
            const user = await User.findByIdAndDelete(req.params.userId);

             // Check if the user is not found, and return a 404 status with an appropriate message
            if (!user) {
                return res.status(404).json({ message: "No user with that ID was found" });
            }

            // Delete all thoughts associated with the user
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            // Respond with a 200 status and a success message indicating the user and associated thoughts and reactions were deleted
            res.status(200).json({
                message: "User & thoughts and reactions deleted!",
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Add friend controller method
    async addFriend(req, res) {
        try {
             // Find the user by its ID and update its 'friends' array by adding the friend's ID
            const friend = await User.findByIdAndUpdate(
                req.params.userId,  
                { $addToSet: { friends: req.params.friendId } },    // Use $addToSet to avoid duplicate friend entries
                { runValidators: true, new: true }  // Ensure validators are run, and get the updated user document
            );

            // Check if the user is not found, and return a 404 status with an appropriate message
            if (!friend) {
                return res.status(404).json({ message: "No user with that ID" });
            }

            // Respond with a 200 status and the updated user (now including the new friend) in JSON format
            res.status(200).json(friend);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Delete friend controller method
    async deleteFriend(req, res) {
        try {
            // Find the user by its ID and update its 'friends' array by pulling the specified friend's ID
            const friend = await User.findByIdAndUpdate(
                req.params.userId,      
                { $pull: { friends: req.params.friendId } },     // Use $pull to remove the specified friend by its ID
                { runValidators: true, new: true }  // Ensure validators are run, and get the updated user document
            );

            // Check if the user is not found, and return a 404 status with an appropriate message
            if (!friend) {
                return res.status(404).json({ message: "Check user and friend ID" });
            }

            // Respond with a 200 status and the updated user (now without the deleted friend) in JSON format
            res.status(200).json(friend);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

// Exports
module.exports = userController;