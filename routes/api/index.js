// Import the Express Router module
const router = require("express").Router();

// Import the user and thought routes
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// Middleware: Use the userRoutes for paths starting with "/users"
router.use("/users", userRoutes);

// Middleware: Use the thoughtRoutes for paths starting with "/thoughts"
router.use("/thoughts", thoughtRoutes);

// Export the configured router
module.exports = router;