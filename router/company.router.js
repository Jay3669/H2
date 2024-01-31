import express from "express";
import verifyToken from "../functions/verifyJwt.js";
import { createCompany, getAllCompany, update_company } from "../controllers/company.controller.js";

const router = express.Router();
router.post("/createCompany", createCompany),
router.get("/getAllCompany",getAllCompany),
router.post("/update_company",update_company)

export default router