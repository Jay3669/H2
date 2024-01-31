import Hr_details from "../models/hr.model.js";
import Logger from "../config/logger.js";
import bcrypt from "bcryptjs";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import jsonwebtoken from "jsonwebtoken";
const service_module = "HR_MODULE";
import db from "../config/db.js";
import Employee_details from "../models/employee.model.js";

export const createHr = async (req, res) => {
  const {
    first_name,
    email,
    role,
    company,
    designation,
    phone,
    location,
    about,
    password,
  } = req.body;
  if (!first_name) {
    Logger.info("Please enter the name", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Please enter the name"));
  }
  if (!email) {
    Logger.info("Please enter the email", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Please enter the email"));
  }
  if (!password) {
    Logger.info("password is required", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("password is required"));
  }
  const checkdata = await Hr_details.findOne({
    where: { email: req.body.email },
  });
  try {
    if (checkdata) {
      return res.status(400).json(OPERATION_FAILED("HR already exists"));
    }
    const encryptPassword = await bcrypt.hashSync(password, 8);
    let data = {
      time: Date(),
      userId: 12,
    };
    const token = jsonwebtoken.sign(data, process.env.JWT_SECRET_KEY);
    const hr = {
      first_name,
      email,
      role,
      company,
      designation,
      phone,
      location,
      about,
      accessToken: token,
      password: encryptPassword,
    };
    const create_hr = await Hr_details.create(hr);
      if (create_hr) {
        const updateOrg = await db.query(`UPDATE newhrms.company_details  SET 
        hr_ids = array_append(hr_ids,'${create_hr.id}')
        where company = '${create_hr.company}'`);

      return res
        .status(200)
        .json(OPERATION_SUCCESS("HR created successfully", create_hr));
    }
    }
    catch (error) {
        Logger.error(
            "Caught exception in creation of HR",
            { service: service_module },
            error
        );
        res
            .status(400)
            .json(OPERATION_FAILED("Caught exception in creation of HR", error));
        }
}
export const getHr = async (req, res) => {
  try {
    const hr = await Hr_details.findAll({where:{role:"Hr"}});
    if (hr) {
      Logger.info("HR fetched successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("HR fetched successfully", hr));
    } else {
      Logger.error("Error while fetching HR", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while fetching HR"));
    }
  } catch (error) {
    Logger.error(
      "Caught exception in fetching HR",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in fetching HR", error));
  }
};
export const getHrById = async (req, res) => {
  try {
    const hr = await Hr_details.findOne({ where: { id: req.query.id }  });
    if (hr) {
      Logger.info("HR fetched successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("HR fetched successfully", hr));
    } else {
      Logger.error("Error while fetching HR", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while fetching HR"));
    }
  } catch (error) {
    Logger.error(
      "Caught exception in fetching HR",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in fetching HR", error));
  }
};
export const updateHr = async (req, res) => {
  try {
    const hr = await Hr_details.findOne({ where: { id: req.query.id } });
    if (!hr) {
      Logger.error("Error while fetching HR", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while fetching HR"));
    }
    const update_hr = await Hr_details.update(req.body, {
      where: { id: req.query.id },
    });
    if (update_hr) {
      Logger.info("HR updated successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("HR updated successfully", update_hr));
    } else {
      Logger.error("Error while updating HR", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while updating HR"));
    }
  } catch (error) {
    Logger.error(
      "Caught exception in updating HR",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in updating HR", error));
  }
};
export const deleteHr = async (req, res) => {
  try {
    const hr = await Hr_details.findOne({ where: { id: req.query.id } });
    if (!hr) {
      Logger.error("Error while fetching HR", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while fetching HR"));
    }
    const delete_hr = await Hr_details.destroy({ where: { id: req.query.id } });
    if (delete_hr) {
      Logger.info("HR deleted successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("HR deleted successfully", delete_hr));
    } else {
      Logger.error("Error while deleting HR", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while deleting HR"));
    }
  } catch (error) {
    Logger.error(
      "Caught exception in deleting HR",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in deleting HR", error));
  }
};


   

export const getCountCompany = async (req, res) => {
  try {
    const company = req.query.company;

    const countManagers = await Hr_details.count({
      where: { company: company, role: 'Manager' },
    });

    const countHRs = await Hr_details.count({
      where: { company: company, role: 'Hr' },
    });

    const countAdmins = await Hr_details.count({
      where: { company: company, role: 'Admin' },
    });

    const counts = {
      Managers: countManagers,
      Hrs: countHRs,
      Admins: countAdmins,
    };

    Logger.info("Counts fetched successfully", { service: service_module });
    return res.status(200).json(OPERATION_SUCCESS("Counts fetched successfully", counts));
  } catch (error) {
    Logger.error(
      "Caught exception in fetching Counts",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in fetching Counts", error));
  }
};

export const getTotalHrsManagersForCompany = async (req, res) => {
  try {
    const company = req.query.company;

    const managers = await Hr_details.findAll({
      where: { company: company },
    });

    // Assuming there's a model for the employee_details table, replace 'Employee_details' with the actual model
    const employees = await Employee_details.findAll({
      attributes: ['emp_name', 'emp_id', 'role'],
      where: { company: company },
    });

    const allEmployees = managers.concat(employees);

    Logger.info("Data fetched successfully", { service: service_module });
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      allEmployees: allEmployees,
    });
  } catch (error) {
    Logger.error(
      "Caught exception in fetching data",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in fetching data", error));
  }
};
