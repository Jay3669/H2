import express  from "express";
import { Create_timesheet, timesheetByEmp_id } from "../controllers/time_sheet.controller.js";

const router = express.Router ();
router.post ("/Create_timesheet",Create_timesheet);
router.get ("/timesheetByEmp_id",timesheetByEmp_id);

export default router; 