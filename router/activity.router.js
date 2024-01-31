import Express  from "express";
import { create_Task, getActiveDateById, get_Activity_Status, get_All_Task, get_All_Task_By_EmployeeId, update_Task } from "../controllers/activity.controller.js";
const router = Express.Router();

router.post("/create_Task",create_Task);
router.get("/get_All_Task_By_EmployeeId",get_All_Task_By_EmployeeId)
router.get("/get_Activity_Status",get_Activity_Status)
router.post("/update_Task",update_Task)
router.get("/getActiveDateById",getActiveDateById)
router.get("/get_All_Task",get_All_Task)



export default router;