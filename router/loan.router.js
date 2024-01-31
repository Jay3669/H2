import Express  from "express";
import { createLoan, get_All_Loans_By_Id } from "../controllers/loan.controller.js"
const router = Express.Router();

router.post("/createLoan", createLoan);
router.get("/getLoansById", get_All_Loans_By_Id)

export default router;