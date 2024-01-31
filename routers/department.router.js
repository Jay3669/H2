import express from "express";
import { createDepartment, getAllDepartments, getDepartmentsByBranchId, updateDepartment, deleteDepartment } from "../controllers/department.controller.js";

const router = express.Router();

router.post("/createDepartment", createDepartment);
router.get("/getAllDepartments", getAllDepartments);
router.get("/getDepartmentsByBranchId", getDepartmentsByBranchId);
router.post("/updateDepartment", updateDepartment);
router.post("/deleteDepartment", deleteDepartment);

export default router;
