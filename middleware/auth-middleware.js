const jwt = require("jsonwebtoken");


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //to authorize the private page, check if there is token from the request header
  //deny access if there isn't token at all
  if(!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied! No token provided. Please provide token to continue"
    });
  }

  //decode the token and verify
  //if token is valid? allow user else deny user
  try {
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodeTokenInfo);
    req.userInfo = decodeTokenInfo;
    next();
  } catch (error) {
      return res.status(500).json({
      success : false,
      message : "Access denied! Invalid token. please login to continue"
    })
  }
  }

  module.exports = authMiddleware;