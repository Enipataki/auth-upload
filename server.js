require("dotenv").config()
const express = require("express");
const connectToDB = require("./database/db");
const authroutes = require("./routes/auth-routes");
const homeroutes = require("./routes/home-routes");
const adminroutes = require("./routes/admin-routes");
const imageroutes = require("./routes/image-routes");
connectToDB();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

//api routes 
app.use('/api/auth', authroutes);
app.use('/api/home', homeroutes);
app.use('/api/admin', adminroutes);
app.use('/api/image', imageroutes)


app.listen(port, () => {
  console.log(`server is now running on port ${port}`);
  
})