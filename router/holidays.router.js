import  Express from "express";
import { create_holidays, get_holidays, get_holidays_by_Company, get_holidays_by_hr } from "../controllers/holidays.controllers.js";
const router = Express.Router();
router.post("/create_holidays",create_holidays );
router.get("/get_holidays",get_holidays );
router.get("/get_holidays_by_Company",get_holidays_by_Company),
router.get("/get_holidays_by_hr",get_holidays_by_hr)

export default router;