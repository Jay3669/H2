import express from "express";
import {
    createDocumentType,
    getdocument_typeById,
    getAlldocument_type,
    updatedocument_type,
    deletedocument_type
 
} from "../controllers/documentType.master.controller.js"
const router = express.Router();

router.post("/createDocumentType", createDocumentType);
router.get("/getdocument_typeById", getdocument_typeById);
router.get("/getAlldocument_type", getAlldocument_type);
router.post("/updatedocument_type", updatedocument_type);
router.post("/deletedocument_type", deletedocument_type);


export default router;
