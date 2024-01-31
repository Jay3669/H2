import Express  from "express";
import { createCandidateLeave, getAllLeave, getCandidateLeave, update_candidateLeave } from "../controllers/candidateLeave.controller.js";
const router = Express.Router();

router.post("/createCandidateLeave",createCandidateLeave)
router.get("/getCandidateLeave",getCandidateLeave)
router.post("/update_candidateLeave",update_candidateLeave)
router.get("/getAllLeave",getAllLeave)


export default router;