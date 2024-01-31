import Express  from "express";
import { getAllHrNotifications,  } from "../controllers/notificationMaster.controller.js";
const router = Express.Router();

router.get("/getAllHrNotifications",getAllHrNotifications)


export default router;