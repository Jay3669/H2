import express from "express";
import verifyToken from "../functions/verifyJwt.js";
import { createPayrole, getAllPayslip, getPayroleById, getPayroleMonthById, send_slipToManager, updatePayroles } from "../controllers/payrole.controller.js";

const router = express.Router();
router.post("/createPayrole",createPayrole)
router.get("/getPayroleById",getPayroleById)
router.get("/getPayroleMonthById",getPayroleMonthById)
router.get("/getAllPayslip",getAllPayslip)
router.post("/send_slipToManager",send_slipToManager)
router.post("/updatePayroles",updatePayroles)

export default router;