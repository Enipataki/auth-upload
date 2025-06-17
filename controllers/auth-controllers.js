const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//register controller
const registerUSer = async (req, res) => {
  try {
    //extract new user info from request body
    const {username, email, password, role} = req.body;


    //check if new user email or username already exist in our database
    const checkExistingUSer = await User.findOne({
      $or : [{username}, {email}]
    });
    if(checkExistingUSer) {
      return res.status(400).json({
        success: false,
        message: "User already in databse! please try again with a valid username or email"
      });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user and save in database
    const newlyCreatedUSer = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    await newlyCreatedUSer.save();

    if(newlyCreatedUSer) {
      res.status(201).json({
        success: true,
        message: "User Registered Successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user! Please try again"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again"
    });
  }
}


//login controller 
const loginUser = async (req, res) => {
  try {
    //extract info from req.body

    console.log("Request Body", req.body);
    const {username, password} = req.body;

    //find if current username exist in database
    const existingUser = await User.findOne({username});
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: `User doesn't exist`
      });
    }
    //check if password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid User credentials"
      });
    }

    //create user login token
    const accessToken = jwt.sign({
      userId: existingUser._id,
      user: existingUser.username,
      role: existingUser.role
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30m"
    } );

    res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      accessToken
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again"
    });
  }
}

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId
    console.log(userId);
    

    //extract old and new password
    console.log(req.body);
    
    const {oldPassword, newPassword} = req.body;

    //find the current logged in user
    const currentUser = await User.findById(userId);

    if(!currentUser) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    //check if old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, currentUser.password);

    if(!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old Password is not correct! Please try again"
      });
    }

    //hash the new password here
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    //update new password
    currentUser.password = newHashedPassword;
    await currentUser.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully"
  });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again"
    });
  }
}

module.exports = {
  registerUSer,
  loginUser,
  changePassword
}