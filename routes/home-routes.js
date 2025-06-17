const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.get('/welcome', authMiddleware, (req, res) => {
  const {user, userId, role} = req.userInfo;
 
  res.json({
    message : 'welcome to my home page',
    user : {
      _id: userId,
      user,
      role
    }
  });
});

module.exports = router;