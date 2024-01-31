import express from "express";
import { createDesignation } from "../controllers/designation.controller.js";

const router = express.Router();

router.post("/createDesignation", createDesignation);

export default router;