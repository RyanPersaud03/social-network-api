// Import the Express Router module
const router = require("express").Router();

// Import API routes from the "api" module
const apiRoutes = require("./api");

// Middleware: Use the API routes for paths starting with "/api"
router.use("/api", apiRoutes);

// Middleware: Handle undefined routes by sending an error message
router.use((req, res) => res.status(404).send("Wrong route"));

// Export the configured router
module.exports = router;