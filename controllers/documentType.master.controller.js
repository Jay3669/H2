import document_type_details from "../models/documentType.master.model.js";
import document_type_company from "../models/documentTypeOrg.model.js";
import document_master_details from "../models/document.master.model.js";
import document_master_company from "../models/documentMaster_Org.model.js";
import Logger from "../config/logger.js";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
const service_module = "DOCUMENT_TYPE_MASTER_MODULE";

export const createDocumentType = async (req, res) => {
  const { document_type, company } = req.body;

  if (!document_type || !company) {
    Logger.info("Some fields are missing", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Some fields are missing"));
  }

  try {
    // Check if the document type already exists for the company
    const checkDocType = await document_type_company.findOne({
      where: { document_type: document_type, company: company },
    });

    let type = {
      document_type: document_type,
      company: company,
    };

    if (checkDocType) {
      return res
        .status(400)
        .json(OPERATION_FAILED("Document type already exists"));
    }

    // Create the document type
    const documentType = await document_type_company.create(type);

    if (documentType) {
      Logger.info("Document type created successfully", {
        service: service_module,
      });

      return res
        .status(200)
        .json(
          OPERATION_SUCCESS("Document type created successfully", documentType)
        );
    } else {
      Logger.error("An error occurred while creating document type", {
        service: service_module,
      });

      return res
        .status(400)
        .json(OPERATION_FAILED("An error occurred while creating document type"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in document type creation",
      { service: service_module },
      error
    );

    res
      .status(500)
      .json(
        OPERATION_FAILED("Caught exception in document type creation", error)
      );
  }
};


export const getdocument_typeById = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    Logger.info("The document type ID is missing", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("The document type ID is missing"));
  }

  try {
    // Find the document type by ID
    let checkDocType = await document_type_company.findOne({
      where: { id: id },
    });

    if (checkDocType) {
      Logger.info("Fetched document type successfully", {
        service: service_module,
      });

      return res
        .status(200)
        .json(
          OPERATION_SUCCESS(
            "Fetched document type successfully",
            checkDocType
          )
        );
    } else {
      Logger.error("An error occured while fetching document type", { service: service_module });

      return res
        .status(400)
        .json(OPERATION_FAILED("An error occured while fetching document type"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in fetching document type",
      { service: service_module },
      error
    );

    res
      .status(500)
      .json(
        OPERATION_FAILED("Caught exception in fetching document type", error)
      );
  }
};


export const getAlldocument_type = async (req, res) => {
  const company = req.query.company;

  try {
    // Find all document types for the given company
    let checkDocType = await document_type_company.findAll({
      order: [["id", "ASC"]],
      where: { company: company },
    });

    if (checkDocType) {
      Logger.info("Fetched document types successfully", {
        service: service_module,
      });

      return res
        .status(200)
        .json(
          OPERATION_SUCCESS("Fetched document types successfully", checkDocType)
        );
    } else {
      Logger.error("Fetching document types failed", { service: service_module });

      return res
        .status(400)
        .json(OPERATION_FAILED("Fetching document types failed"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in fetching document types",
      { service: service_module },
      error
    );

    res
      .status(500)
      .json(
        OPERATION_FAILED("Caught exception in fetching document types", error)
      );
  }
};


export const updatedocument_type = async (req, res) => {
  const { id, document_type, company } = req.body;

  if (!id) {
    Logger.info("The document type ID is missing", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("The document type ID is missing"));
  }

  try {
    // Check if the document type exists
    let checkDocType = await document_type_organization.findOne({
      where: { id: id },
    });

    if (checkDocType) {
      let type = {
        document_type: document_type,
      };

      // Update the document type
      const update = await document_type_company.update(type, {
        where: { id: id, company: company },
      });

      Logger.info("Updated document_type successfully", {
        service: service_module,
      });

      return res
        .status(200)
        .json(
          OPERATION_SUCCESS("Updated document_type successfully", update)
        );
    } else {
      Logger.error("An error occured while updating document type", { service: service_module });

      return res
        .status(400)
        .json(OPERATION_FAILED("An error occured while updating document type"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in updating document_type",
      { service: service_module },
      error
    );

    res
      .status(500)
      .json(
        OPERATION_FAILED("Caught exception in updating document_type", error)
      );
  }
};


export async function deletedocument_type(req, res) {
  const id = req.body.id;

  try {
    // Delete the document type
    let deleteDept = await document_type_company.destroy({
      where: { id: id },
    });

    // Delete associated documents with the document type
    let deleteDoc = await document_master_company.destroy({
      where: { document_type_id: id },
    });

    if (deleteDept) {
      Logger.info("Deleted document_type successfully", {
        service: service_module,
      });

      return res
        .status(200)
        .json(
          OPERATION_SUCCESS("Deleted document_type successfully", deleteDept)
        );
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in deleting document_type",
      { service: service_module },
      error
    );

    res
      .status(500)
      .json(
        OPERATION_FAILED("Caught exception in deleting document_type", error)
      );
  }
}


