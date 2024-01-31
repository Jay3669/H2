import express from "express";
import { userRegister, userLogin, deleteUser, getAllUsers, calculatePayroll } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/userRegister", userRegister);
router.post("/userLogin", userLogin);
router.post("/deleteUser", deleteUser);
router.get("/getAllUsers", getAllUsers);
router.post("/calculatePayroll", calculatePayroll);

export default router;
