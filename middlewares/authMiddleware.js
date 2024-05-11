import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};




//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};


//super admin acceess
export const isSuperAdmin = async (req, res, next) => {
    try {
      
      const user = await userModel.findById(req.user._id);
      if (user.role !== 2) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };
  

  export const isAdminSuperAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
  
      // Check if the user's role is neither 1 nor 2
      if (user.role !== 1 && user.role !== 2) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access",
        });
      }
  
      // If the user's role is 1 or 2, proceed to the next middleware
      next();
    } catch (error) {
      console.error('Error in admin middleware:', error);
      res.status(500).send({
        success: false,
        message: "Error in admin middleware",
        error: error.message
      });
    }
  };
  