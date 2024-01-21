// Import the Express Router module
const router = require("express").Router();

// Import functions from userController.js
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");

// Define routes for the "/api/users" endpoint
router.route("/")
    .get(getUsers)
    .post(createUser);

// Define routes for the "/api/users/:userId" endpoint
router.route("/:userId")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// Define routes for the "/api/users/:userId/friends/:friendId" endpoint
router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

// Export the configured router
module.exports = router;