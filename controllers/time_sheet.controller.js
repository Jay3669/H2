import db from "../config/db.js";
const service_module = "TIMESHEET DETAILS";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import Logger from "../config/logger.js";
import timesheet_details from "../models/timesheet.model.js";
import { NUMBER } from "sequelize";


// export const Create_timesheet = async (req, res) => {
//   const { emp_id, date, start_time, end_time, description, emp_type, work_hrs } = req.body;

//   try {
//     // Convert start_time and end_time to Date objects
//     const startTime = new Date(start_time);
//     const endTime = new Date(end_time);

//     const timeDifference = endTime - startTime;

//     const total_time = timeDifference / (1000 * 60 * 60);

 

//     const timesheet = {
//       emp_id,
//       date,
//       start_time,
//       end_time,
//       total_time,
//       status: 'PENDING',
//       description,
//       emp_type,
//       work_hrs,
//       actual_hrs ,
//       total_hrs
//     };

//     const createdTimesheet = await timesheet_details.create(timesheet);

//     if (createdTimesheet) {
//       return res.status(200).json(OPERATION_SUCCESS("Timesheet created successfully", createdTimesheet));
//     }
//   } catch (error) {
//     console.error(error);

//     // Log the error using your Logger module
//     Logger.error("Caught exception in creation of Timesheet", { service: service_module }, error);

//     return res.status(400).json(OPERATION_FAILED("Caught exception in creation of Timesheet", error));
//   }
// };



export const Create_timesheet = async (req, res) => {
  const { emp_id, date, description, emp_type, work_hrs } = req.body;

  try {
    let actual_hrs;
    if (emp_type === 'Contract') {
      actual_hrs = 9;
    } else if (emp_type === 'Full Time') {
      actual_hrs = 8;
    } else {
      actual_hrs = 8;
    }

    const total_hrs = actual_hrs - parseFloat(work_hrs);

    const timesheet = {
      emp_id,
      date,
      description,
      emp_type,
      work_hrs,
      actual_hrs,
      total_hrs,
      status: 'PENDING',
    };

    const createdTimesheet = await timesheet_details.create(timesheet);

    if (createdTimesheet) {
      return res.status(200).json(OPERATION_SUCCESS("Timesheet created successfully", createdTimesheet));
    }
  } catch (error) {
    console.error(error);

    // Log the error using your Logger module
    Logger.error("Caught exception in creation of Timesheet", { service: service_module }, error);

    return res.status(400).json(OPERATION_FAILED("Caught exception in creation of Timesheet", error));
  }
};


export const timesheetByEmp_id = async (req, res) => {
  const emp_id = req.query.emp_id;
  try {
    const timesheet = await timesheet_details.findAll({ where: { emp_id: emp_id } });
    if (timesheet) {
      return res.status(200).json(OPERATION_SUCCESS("Timesheet fetched successfully", timesheet));
    }
  } catch (error) {
    console.error(error);
    // Log the error using your Logger module
    Logger.error("Caught exception in creation of Timesheet", { service: service_module }, error);
    return res.status(400).json(OPERATION_FAILED("Caught exception in creation of Timesheet", error));
    }
  }

  