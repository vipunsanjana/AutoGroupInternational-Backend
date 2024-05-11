import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  getAllUsersController,
  deleteAdminController,
  deleteUserController,
  getUsersController,

} from "../controllers/authController.js";
import { isAdmin,isSuperAdmin, requireSignIn,isAdminSuperAdmin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//All Users || GET
router.get("/all-users", requireSignIn, isSuperAdmin, getAllUsersController);

//All Users Only || GET
router.get("/all-users-only", requireSignIn, isAdminSuperAdmin, getUsersController);


//Delete Admin || DELETE
router.delete("/delete-admin/:id", requireSignIn, isSuperAdmin, deleteAdminController);


//Delete User || DELETE
router.delete("/delete-user/:id", requireSignIn, isAdminSuperAdmin, deleteUserController);


export default router;
