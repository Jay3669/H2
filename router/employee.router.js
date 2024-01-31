import express from "express";
import verifyToken from "../functions/verifyJwt.js";
import { createEmployee, delete_employee, getAllEmployee, getAllempBankByID, getEmpByRole, getEmployeeById, inviteEmployee, loginEmployee, update_employee } from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/createEmployee",createEmployee);
router.post("/loginEmployee",loginEmployee)
router.get("/getEmployeeById",getEmployeeById);
router.get("/getAllEmployee",getAllEmployee);
router.get("/getEmpByRole",getEmpByRole);
router.post("/update_employee",update_employee)
router.get("/getAllempBankByID",getAllempBankByID)
router.post("/delete_employee",delete_employee)
router.post("/inviteEmployee",inviteEmployee)
export default router;