import express from "express";
import verifyToken from "../functions/verifyJwt.js";
import { createManager, getAllManager, getByRole } from "../controllers/manager.controller.js";

const router = express.Router();

router.post("/createManager",createManager)
router.get("/getAllManager",getAllManager)
router.get("/getByRole",getByRole)

export default router;