import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if all required fields are provided
      if (!username || !password ) {
        return res.status(400).send({ message: "All fields are required" });
      }
  
      // Check if user already exists
      const existingUser = await userModel.findOne({ username });
      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await hashPassword(password);
  
      // Create a token for username confirmation
      const token = JWT.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      // Save the user to the database
      const newUser = new userModel({
        username,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).send({ message: "Registered successfully." });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  };
  

  
  
  //POST LOGIN
  export const loginController = async (req, res) => {
    try {
      const { username, password } = req.body;
      //validation
      if (!username || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid username or password",
        });
      }
      //check user
      const user = await userModel.findOne({ username });


      const loginCheck = await userModel.findOne({ username }); 
    
      
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "username is not registerd",
        });
      }
  
      if (loginCheck.role !== 1 && loginCheck.role !== 2 && loginCheck.role == 0) { 
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }


      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          username: user.username,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };




//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    if (!username) {
      res.status(400).send({ message: "Emai is required" });
    }

    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ username });
    //validation
    const loginCheck = await userModel.findOne({ username }); 
    
      
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "username is not registerd",
      });
    }

    if (loginCheck.role !== 1 && loginCheck.role !== 2 && loginCheck.role == 0) { 
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};




  
export const getAllUsersController = async (req, res) => {
  try {
    // Fetch all users from the database
    const admins = await userModel.find({});

    // Send the users as a response
    res.status(200).json({
      success: true,
      message: 'Admins retrieved successfully',
      admins: admins
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};





export const getUsersController = async (req, res) => {
  try {
    // Fetch users with role equal to 0 from the database
    const users = await userModel.find({ role: 0 });

    // Send the users as a response
    res.status(200).json({
      success: true,
      message: 'Users with role equal to 0 retrieved successfully',
      users: users
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};






export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete the user
    await userModel.findByIdAndDelete(userId);

    // Send a success response
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
  





export const deleteAdminController = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if(user.role === 2){
      return res.status(404).json({ success: false, message: 'Cant delete!' });
    }

    // Delete the user
    await userModel.findByIdAndDelete(userId);

    // Send a success response
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};