import express from "express";
import { create_job_details, delete_job_details, get_all_job_details, get_details_by_jobCode, update_job_details } from "../controllers/jobDetails.controller.js";
const router = express.Router();
router.post("/create_job_details", create_job_details),
    router.get("/get_all_job_details", get_all_job_details),
    router.get("/get_details_by_jobCode", get_details_by_jobCode),
    router.post("/update_job_details", update_job_details),
    router.post("/delete_job_details", delete_job_details)

export default router 