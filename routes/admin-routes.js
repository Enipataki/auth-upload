const express = require("express");
const adminMiddleware = require("../middleware/admin-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the admin page"
  })
});

module.exports = router;

