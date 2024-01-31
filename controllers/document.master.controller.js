import Logger from "../config/logger.js";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import db from "../config/db.js";
import document_master_company from "../models/documentMaster_Org.model.js";
const service_module = "document_MODULE";

export const createDoc = async (req, res) => {
  const { document_type_id, document, company } = req.body;

  // Check if required fields are missing
  if (!document_type_id || !document || !company) {
    Logger.info("Some fields are missing", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Some fields are missing"));
  }

  try {
    // Check if the document already exists
    const checkDocument = await document_master_company.findOne({
      where: {
        document_type_id: document_type_id,
        document: document,
        company: company,
      },
    });

    let doc = {
      document_type_id: document_type_id,
      document: document,
      company: company,
    };

    if (checkDocument) {
      // Return error message if the document already exists
      Logger.info("Document already exists", {
        service: service_module,
      });
      return res.status(400).json(OPERATION_FAILED("Document already exists"));
    }

    // Create the new document
    const createdDocument = await document_master_company.create(doc);

    if (createdDocument) {
      Logger.info("Document created successfully", {
        service: service_module,
      });

      // Return success message and the created document
      return res
        .status(200)
        .json(
          OPERATION_SUCCESS("Document created successfully", createdDocument)
        );
    } else {
      Logger.error("An error occured while creating the document", {
        service: service_module,
      });

      // Return error message if there was an error during document creation
      return res
        .status(400)
        .json(OPERATION_FAILED("An error occured while creating the document"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in document creation",
      { service: service_module },
      error
    );

    // Return error message if an exception occurred
    res
      .status(500)
      .json(
        OPERATION_FAILED("Caught exception in document creation", error)
      );
  }
};


export const getDocById = async (req, res) => {
  const id = req.query.id;

  // Check if ID is missing
  if (!id) {
    Logger.info("The document ID is missing", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("The document ID is missing"));
  }

  try {
    // Find the document by ID
    let checkDocument = await document_master_company.findOne({
      where: { id: id },
    });

    if (checkDocument) {
      Logger.info("Fetched document successfully", { service: service_module });

      // Return the fetched document
      return res
        .status(200)
        .json(
          OPERATION_SUCCESS("Fetched document successfully", checkDocument)
        );
    } else {
      Logger.error("An error occurred while fetching document details", { service: service_module });

      // Return error message if document retrieval failed
      return res
        .status(400)
        .json(OPERATION_FAILED("An error occurred while fetching document details"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in fetching document",
      { service: service_module },
      error
    );

    // Return error message if an exception occurred
    res
      .status(500)
      .json(OPERATION_FAILED("Caught exception in fetching document", error));
  }
};

export const getAllDocs = async (req, res) => {
  const { document_type_id } = req.query;

  try {
    // Find all documents matching the document type ID
    let checkDocuments = await document_master_company.findAll({
      where: { document_type_id: document_type_id },
      order: [["id", "ASC"]],
    });

    if (checkDocuments) {
      Logger.info("Fetched documents successfully", { service: service_module });

      // Return the fetched documents
      return res
        .status(200)
        .json(
          OPERATION_SUCCESS("Fetched documents successfully", checkDocuments)
        );
    } else {
      Logger.error("An error occurred while fetching document details", { service: service_module });

      // Return error message if document retrieval failed
      return res
        .status(400)
        .json(OPERATION_FAILED("An error occurred while fetching document details"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in fetching documents",
      { service: service_module },
      error
    );

    // Return error message if an exception occurred
    res
      .status(500)
      .json(
        OPERATION_FAILED("Caught exception in fetching documents", error)
      );
  }
};


export const updateDoc = async (req, res) => {
  const { id, company, document } = req.body;

  if (!id) {
    Logger.info("The document ID is missing", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("The document ID is missing"));
  }

  try {
    // Create an object with updated document details
    let obj = {
      document: document,
      company: company
    };

    // Find the document to check if it exists
    let checkDocument = await document_master_company.findOne({
      where: { id: id },
    });

    if (checkDocument) {
      // Update the document with the new details
      const update = await document_master_company.update(obj, {
        where: { id: id },
      });

      Logger.info("Updated document details successfully", { service: service_module });

      // Return the update operation result
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Updated document details successfully", update));
    } else {
      Logger.error("An error occurred while updating document details", { service: service_module });

      // Return error message if document update failed
      return res
        .status(400)
        .json(OPERATION_FAILED("An error occurred while updating document details"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in updating document",
      { service: service_module },
      error
    );

    // Return error message if an exception occurred
    res
      .status(500)
      .json(OPERATION_FAILED("Caught exception in updating document", error));
  }
};


export async function deleteDoc(req, res) {
  const { id, company } = req.body;

  try {
    // Delete the document
    let deleteDoc = await document_master_company.destroy({
      where: { id: id, company: company },
    });

    if (deleteDoc) {
      Logger.info("Deleted document successfully", {
        service: service_module,
      });

      return res
        .status(200)
        .json(OPERATION_SUCCESS("Deleted document successfully", deleteDoc));
    }
  } catch (error) {
    Logger.error(
      "Caught exception while deleting document",
      { service: service_module },
      error
    );

    res
      .status(500)
      .json(OPERATION_FAILED("Caught exception while deleting document", error));
  }
}


export const getAllDocumentTypesAndDocuments = async (req, res) => {
  const company = req.query.company;

  try {
    let documents = [];

    // Fetch document types for the company
    let [documentTypes] = await db.query(`
      SELECT id as doc_type_id, document_type, company
      FROM newhrms.document_type_company
      WHERE company = '${company}'
      ORDER BY id ASC
    `);

    // Iterate over each document type
    for (let i = 0; i < documentTypes.length; i++) {
      // Fetch documents for the current document type
      let [documentsByType] = await db.query(`
        SELECT id, document_type_id, document, company
        FROM newhrms.document_company
        WHERE document_type_id = '${documentTypes[i].doc_type_id}'
      `);

      let doc = {
        doc_type_id: documentTypes[i].doc_type_id,
        document_type: documentTypes[i].document_type,
        docs: documentsByType,
      };

      documents.push(doc);
    }

    if (documentTypes) {
      Logger.info("Fetched all documents successfully", {
        service: service_module,
      });

      return res
        .status(200)
        .json(OPERATION_SUCCESS("Fetched all documents successfully", documents));
    } else {
      Logger.error("No documents found", { service: service_module });
      
      return res
        .status(400)
        .json(OPERATION_FAILED("No documents found", []));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception while fetching documents",
      { service: service_module },
      error
    );

    res
      .status(500)
      .json(
        OPERATION_FAILED("Caught exception while fetching documents", error)
      );
  }
};




