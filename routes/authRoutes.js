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
router.get("/all-users", requireSignIn , getAllUsersController);

//All Users Only || GET
router.get("/all-users-only", requireSignIn, getUsersController);


//Delete Admin || DELETE
router.delete("/delete-admin/:id", requireSignIn, isSuperAdmin, deleteAdminController);


//Delete User || DELETE
router.delete("/delete-user/:id", requireSignIn, isAdminSuperAdmin, deleteUserController);


router.get("/superAdmin-auth", requireSignIn,isSuperAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdminSuperAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-SuperAdmin-auth", requireSignIn,isAdminSuperAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


export default router;
