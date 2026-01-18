const express = require('express');
const colors = require("colors");
const cors = require('cors');
const morgan =require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');


//dot en configurtaion
dotenv.config();



//DB Connection
connectDb();


//rest object
const app =express();

//middle-wares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//route
//URL => http://localhost:8080
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));



app.get("/", (req,res) => {
    return res.status(200).send("<h1>Welcome to Food Server app API BASE project</h1>");
}) 

//PORT
const PORT = process.env.PORT   //here 5000 is optional,if the port 8080 doesnot work then it will be considered

//listen
app.listen(PORT ,() => {
    console.log(`Server running on ${PORT}`.white.bgMagenta);
});

 //here nodemon is basically used to reload the http page automatically after making any changes in the server.js page