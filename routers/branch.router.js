import express from "express";
import { createBranch, getAllBranches, updateBranch, getAllBranchesByCompanyName, deleteBranch } from "../controllers/branch.controller.js";

const router = express.Router();

router.post("/createBranch", createBranch);
router.get("/getAllBranches", getAllBranches);
router.post("/updateBranch", updateBranch);
router.get("/getAllBranchesByCompanyName", getAllBranchesByCompanyName);
router.post("/deleteBranch", deleteBranch);

export default router;
