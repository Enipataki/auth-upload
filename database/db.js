const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected Succesfully");
    
  } catch (error) {
    console.log("MongoDB connection failed");
    process.exit(1);
  }
}

module.exports = connectToDB;
