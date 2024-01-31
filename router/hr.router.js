import express from "express";
import verifyToken from "../functions/verifyJwt.js";
import {  createHr, getHr } from "../controllers/hr.controller.js";

const router = express.Router();

router.post("/createHr",createHr)
router.get("/getHr",getHr)
export default router;
