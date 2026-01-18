const express = require('express');
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController
} = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET USER
router.get('/getUser', authMiddleware, getUserController);

// UPDATE USER
router.put('/updateUser', authMiddleware, updateUserController);

// RESET PASSWORD (NO auth middleware needed)
router.post('/resetPassword', resetPasswordController);

//PASSWORD UPDATE 
router.post('/updatePassword' ,authMiddleware ,updatePasswordController); 

//DLETE USER
router.delete('/deleteUser/:id',authMiddleware, deleteProfileController)

module.exports = router;
