const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone, answer } = req.body;

    if (!userName || !email || !password || !address || !answer || !phone) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",  
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "Email already registered, please login",
      });
    }

    //hashing password
    var salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      userName,
      email,
      password:hashedPassword,
      address,
      phone,
      answer,
    });
    
    res.status(201).send({
      success: true,
      message: "Successfully registered",
      user,
    });

  } catch (error) {
    console.log(error); // 👈 SEE REAL ERROR IN TERMINAL
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
  
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide Email and Password",
      });
    }

    const user = await userModel.findOne({ email} );
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found  ",
      });
    }
    //check user password | Compare Password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials"
      })
    }
    //token
    const token = JWT.sign({id:user._id}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password =undefined;

    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
