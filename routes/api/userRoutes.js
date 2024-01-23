// Import the Express Router module
const router = require("express").Router();

// Import functions from userController.js
const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");


router.route("/")
    .get(getUsers)
    .post(createUser);


router.route("/:userId")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);


router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

// Export the configured router
module.exports = router;