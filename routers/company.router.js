import express from "express";
import { createCompany, getAllCompanies, updateCompany, deleteCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/createCompany", createCompany);
router.get("/getAllCompanies", getAllCompanies);
router.post("/updateCompany", updateCompany);
router.post("/deleteCompany", deleteCompany);

export default router;
