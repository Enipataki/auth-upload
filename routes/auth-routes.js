const express = require("express");
const {registerUSer, loginUser, changePassword} = require("../controllers/auth-controllers");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

//routes for authentication and authorization
router.post("/register", registerUSer);
router.post("/login", loginUser); 
router.post('/password', authMiddleware, changePassword);



module.exports = router;