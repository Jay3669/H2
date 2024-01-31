import db from "../config/db.js";
const service_module = "CANDIDATELEAVE_DETAILS";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import Logger from "../config/logger.js";
import Employee_details from "../models/employee.model.js";
import candidate_leave from "../models/candidateLeave.model.js";
import { notificationInsert } from "../functions/notificationInsert.function.js";

// export const createCandidateLeave = async (req, res) =>
//     try {
//         let act = {
//             emp_id: req.body.emp_id,
//             emp_name: req.body.emp_name,
//             leave_from: req.body.leave_from,
//             leave_to: req.body.leave_to,
//             leave_type: req.body.leave_type,
//             leave_reason: req.body.leave_reason,
//             // attachmemts: req.body.attachmemts,
//         };
//         const create = await candidate_leave.create(act);
//         return res
//             .status(200)
//             .json(OPERATION_SUCCESS("Leave created successfully", create));
//     } catch (error) {
//         console.log(error);
//         Logger.error(
//             "Caught exception in creation of Leave",
//             { service: service_module },
//             error
//         );
//         res
//             .status(400)
//             .json(OPERATION_FAILED("Caught exception in creation of Leave", error));
//     }
// };

// export const createCandidateLeave = async (req, res) => {
//   const {
//     emp_id,
//     emp_name,
//     leave_from,
//     leave_to,
//     leave_type,
//     leave_reason,
//     attachments,
//     request_to,
//     approved_by,
//     session,
//   } = req.body;
//   try {
//     const getemp = await Employee_details.findOne({
//       where: { emp_id: emp_id },
//     });

//     let name = getemp.emp_name;

//     const startDate = new Date(leave_from);
//     const endDate = new Date(leave_to);
//     const timeDifference = endDate - startDate;
//     const leave_days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Calculate days

//     const remaining_leaves = total_leaves - leave_days;

//     let act = {
//       emp_id: emp_id,
//       emp_name: emp_name,
//       leave_from: leave_from,
//       leave_to: leave_to,
//       leave_type: leave_type,
//       leave_reason: leave_reason,
//       attachments: attachments,
//       request_to: request_to,
//       approved_by: approved_by,
//       leave_days: leave_days,
//       session: session,
//       total_leaves: "10",
//       remaining_leaves:remaining_leaves
//     };
//     const create_leave = await candidate_leave.create(act);

//     if (create_leave) {
//       // If the Leave is created successfully, return a success response
//       Logger.info("Leave created successfully", { service: service_module });
//       return res
//         .status(200)
//         .json(OPERATION_SUCCESS("Leave created successfully", create_leave));
//     } else {
//       // If there is an error while creating the Leave, return an error response
//       Logger.error("Error while creating Leave", { service: service_module });
//       return res
//         .status(400)
//         .json(OPERATION_FAILED("Error while creating Leave"));
//     }
//   } catch (error) {
//     // Handle any exceptions that occur during the execution
//     console.log(error);
//     Logger.error(
//       "Caught exception in creation of Leave",
//       { service: service_module },
//       error
//     );
//     res
//       .status(400)
//       .json(OPERATION_FAILED("Caught exception in creation of Leave", error));
//   }
// };

export const createCandidateLeave = async (req, res) => {
  const {
    emp_id,
    emp_name,
    leave_from,
    leave_to,
    leave_type,
    emp_type,
    leave_reason,
    attachments,
    request_to,
    approved_by,
    session,
    sender_email,
    leaves_month,
    leaves_year,
  } = req.body;

  try {
    const getemp = await Employee_details.findOne({
      where: { emp_id: emp_id },
    });

    if (!getemp) {
      return res.status(404).json({ error: "Employee not found" });
    }

    let name = getemp.emp_name;

    const startDate = new Date(leave_from);
    const endDate = new Date(leave_to);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const leave_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1; // Calculate days



    const remaining_leaves = total_leaves - leave_days;

    let act = {
      emp_id: emp_id,
      emp_name: emp_name,
      leave_from: leave_from,
      leave_to: leave_to,
      leave_type: leave_type,
      leave_reason: leave_reason,
      attachments: attachments,
      request_to: request_to,
      approved_by: approved_by,
      leave_days: leave_days,
      session: session,
      total_leaves: total_leaves,
      remaining_leaves: remaining_leaves,
      leave_status: "HOLD",
      sender_email: sender_email,
      emp_type: emp_type,
      leaves_month:leaves_month,
      leaves_year:leaves_year
    };
    const create_leave = await candidate_leave.create(act);

    let source_mail_id = getemp.email;
    let target_mail_id = create_leave.sender_email;
    let description = `${getemp.emp_name} requested  ${leave_type}`;
    let notification_id = create_leave.id;
    let notification_type = "Leave Request";
    let empLeave_id = create_leave.id;
    const notificationInsertResult = await notificationInsert(
      source_mail_id,
      target_mail_id,
      description,
      notification_id,
      notification_type,
      empLeave_id
    );

    if (create_leave) {
      // If the Leave is created successfully, return a success response
      Logger.info("Leave created successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Leave created successfully", create_leave));
    } else {
      // If there is an error while creating the Leave, return an error response
      Logger.error("Error while creating Leave", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while creating Leave"));
    }
  } catch (error) {
    // Handle any exceptions that occur during the execution
    console.log(error);
    Logger.error(
      "Caught exception in creation of Leave",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in creation of Leave", error));
  }
};

export const getCandidateLeave = async (req, res) => {
  try {
    const emp_id = req.query.emp_id;
    var query = `SELECT * FROM newhrms.candidate_leaves  where emp_id = '${emp_id}'`;
    const get_CandidateLeave = await db.query(query);
    if (emp_id) {
      // If the post is created successfully, return a success response
      Logger.info("Leave fetched successfully", { service: service_module });
      return res
        .status(200)
        .json(
          OPERATION_SUCCESS("Leave fetched successfully", get_CandidateLeave)
        );
    } else {
      // If there is an error while creating the post, return an error response
      Logger.error("Error while creating Post", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while creating Leave"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in creation of Leave",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in creation of Leave", error));
  }
};

export const getAllLeave = async (req, res) => {
  try {
    const query = `SELECT * FROM newhrms.candidate_leaves`;
    const get_CandidateLeave = await db.query(query);
    if (query) {
      Logger.info("Leave fetched successfully", { service: service_module });
      return res
        .status(200)
        .json(
          OPERATION_SUCCESS("Leave fetched successfully", get_CandidateLeave)
        );
    } else {
      // If there is an error while creating the post, return an error response
      Logger.error("Error while creating Post", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while creating Leave"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in creation of Leave",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in creation of Leave", error));
  }
};

export const update_candidateLeave = async(req, res) => {
  const id = req.body.id;
  const {
    emp_id,
    emp_name,
    leave_from,
    leave_to,
    leave_type,
    leave_reason,
    attachments,
    request_to,
    approved_by,
    leave_days,
    session,
    total_leaves,
    remaining_leaves,
    leave_status,
  } = req.body;
 const update =  await candidate_leave.update(
      {
        emp_id: emp_id,
        emp_name: emp_name,
        leave_from: leave_from,
        leave_to: leave_to,
        leave_type: leave_type,
        leave_reason: leave_reason,
        attachments: attachments,
        request_to: request_to,
        approved_by: approved_by,
        leave_days: leave_days,
        session: session,
        total_leaves: total_leaves,
        remaining_leaves: remaining_leaves,
        leave_status: leave_status,
      },
      { where: { emp_id : emp_id } }
    )
    .then((result) => {
      res.status(200).json({ message: "Leave Updated Successfully",update });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Error While Updating Leave" });
    });
};

