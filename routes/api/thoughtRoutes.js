// Import the Express Router module
const router = require("express").Router();

// Import functions from thoughtController.js
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thoughtController");

// Define routes for the "/api/thoughts" endpoint
router.route("/")
    .get(getThoughts)
    .post(createThought);

// Define routes for the "/api/thoughts/:thoughtId" endpoint
router.route("/:thoughtId")
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

// Define routes for the "/api/thoughts/:thoughtId/reactions" endpoint
router.route("/:thoughtId/reactions")
    .post(addReaction);

// Define routes for the "/api/thoughts/:thoughtId/reactions/:reactionId" endpoint
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

// Export the configured router
module.exports = router;