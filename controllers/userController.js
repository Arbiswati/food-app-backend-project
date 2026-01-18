const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { userName, address, phone } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
    });
  }
};

// GET USER
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
    });
  }
};

// RESET PASSWORD

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or wrong answer",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Reset Password API",
    });
  }
};
// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // password logic later
    res.status(200).send({
      success: true,
      message: "Password updated",
    });
    //get data from user
    const {oldPassword,newPassword} = req.body
    if(!oldPassword || !newPassword){
      return res.status(500).send({
        success:false,
        message:'Please Provide Old or New Password'
      })
    }
    //check user password | Compare Password
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
          return res.status(500).send({
            success: false,
            message: "Invalid Old Password",
          })
        }
        //hashing password
            var salt = bcrypt.genSaltSync(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            user.password = hashedPassword
            await user.save()
            res.status(200).send({
              success:true,
              message:'Password Updated',
            })
        
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

//DELETE PROFILE ACCOUNT 
const deleteProfileController = async(req,res) => {
  try{
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
      success:true,
      message: 'Your account has been deleted',
    })

  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error In Delete Profile API',
      error

    })
  }
}


module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController

};
