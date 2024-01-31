import Express  from "express";
import { createCurrency, getAllCurrency, getCurrencyByCountry } from "../controllers/currency.controller.js";
const router = Express.Router();

router.post("/createCurrency",createCurrency);
router.get("/ByCountry",getCurrencyByCountry);
router.get("/getAllCurrency",getAllCurrency);


export default router;
