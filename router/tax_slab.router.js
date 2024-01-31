import express from "express";
import verifyToken from "../functions/verifyJwt.js";
import { FilterByYear, createTaxSlab, getAllTaxSlab, getTaxSlabByYear } from "../controllers/tax_slab.controller.js";

const router = express.Router ();

router.post("/createTaxSlab",createTaxSlab);
router.get("/getAllTaxSlab",getAllTaxSlab);
router.get("/getTaxSlabByYear",getTaxSlabByYear);
router.get("/FilterByYear",FilterByYear)
export default router;
