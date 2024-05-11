import express from "express";
import {
    createRequestController,
    getAllRequest,
    getRequestById,
    updateRequestStatus,

} from "../controllers/requestController.js";
import { isAdmin,isSuperAdmin, requireSignIn,isAdminSuperAdmin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();


//create request || POST
router.post(
    "/create-request",
    requireSignIn,
    isAdmin,
    createRequestController
  );

//get all request || GET
router.get(
    "/all-request",
    requireSignIn,
    isAdmin,
    getAllRequest
  );



//get request by id || GET
router.get(
    "/get-request-id/:id",
  
    getRequestById
  );


  router.put(
    "/accept-request/:id",

    updateRequestStatus
  );

export default router;
