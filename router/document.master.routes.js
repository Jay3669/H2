import express from "express";
import {
    createDoc,
    getDocById,
    getAllDocs,
    updateDoc,
    deleteDoc,
    getAllDocumentTypesAndDocuments

 
} from "../controllers/document.master.controller.js";
const router = express.Router();

router.post("/createDoc", createDoc);
router.get("/getDocById", getDocById);
router.get("/getAllDocs", getAllDocs);
router.get("/getAllDocumentTypesAndDocuments", getAllDocumentTypesAndDocuments);
router.post("/updateDoc", updateDoc);
router.post("/deleteDoc", deleteDoc);


export default router;
