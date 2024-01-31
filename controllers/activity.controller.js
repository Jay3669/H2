import Activity_details from "../models/activity.model.js";
import db from "../config/db.js";
const service_module = "Activity_Details";
import Employee_details from "../models/employee.model.js";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import { activityInsert } from "../functions/activity.js";
import Logger from "../config/logger.js";
import { calculateTotalWorkingHours } from "../functions/hours.js";

// export const create_Task = async (req, res) => {
//   const { emp_id, firstName, date, activity_name, start_date, end_date,activity_description,estimated_time } =req.body;

//   try {
//     let act = {
//       emp_id: emp_id,
//       firstName: firstName,
//       date: date,
//       estimated_time:estimated_time,
//       activity_name: activity_name,
//       activity_description: activity_description,
//       start_date: start_date,
//       end_date: end_date,
//       status: "NEW",
//     };

//     const getemp = await Employee_details.findOne({ where: { emp_id:emp_id  } });

//     // Retrieve employee name  from the result
//     let empname = getemp.firstName;

//     const create_Activity = await Activity_details.create(act);

//     // Prepare activity  details
//     let employee_id = getemp.emp_id;
//     let source_mail_id = getemp.email;
//     var target_mail_id = getemp.email;
//     let description = getemp.description;
//     // `${empname} created ${req.body.activity}`;
//     let activity_id = create_Activity.id;
//     let activity_type = "Task";

//     // Insert activity record
//     const activityInsertResult = await activityInsert(
//       employee_id,
//       source_mail_id,
//       target_mail_id,
//       description,
//       activity_id,
//       activity_type,
//     );

//     if (create_Task) {
//       // If the post is created successfully, return a success response
//       Logger.info("Task created successfully", { service: service_module });
//       return res
//         .status(200)
//         .json(OPERATION_SUCCESS("Task created successfully", create_Task));
//     } else {
//       // If there is an error while creating the post, return an error response
//       Logger.error("Error while creating Post", { service: service_module });
//       return res
//         .status(400)
//         .json(OPERATION_FAILED("Error while creating Task"));
//     }
//   } catch (error) {
//     // Handle any exceptions that occur during the execution
//     console.log(error);
//     Logger.error(
//       "Caught exception in creation of Task",
//       { service: service_module },
//       error
//     );
//     res
//       .status(400)
//       .json(OPERATION_FAILED("Caught exception in creation of Task", error));
//   }
// };

export const create_Task = async (req, res) => {
  const {
    emp_id,
    firstName,
    date,
    activity_name,
    start_date,
    end_date,
    activity_description,
    estimated_time,
  } = req.body;

  try {
    const getemp = await Employee_details.findOne({
      where: { emp_id: emp_id },
    });

    let empname = getemp.firstName;
    let emp_pic = getemp.pic; 

    let act = {
      emp_id: emp_id,
      firstName: firstName,
      emp_pic : emp_pic,
      date: date,
      estimated_time: estimated_time,
      activity_name: activity_name,
      activity_description: activity_description,
      start_date: start_date,
      end_date: end_date,
      status: "NEW",
      // assignedBy: assignedBy,
    };

    const create_Activity = await Activity_details.create(act);

    // Prepare activity details
    let employee_id = getemp.emp_id;
    let source_mail_id = getemp.email;
    var target_mail_id = getemp.email;
    let description = getemp.description;

    // let assignedBy = `${empname} created task: ${activity_name}`;

    let activity_id = create_Activity.id;
    let activity_type = "Task";

    // Insert activity record
    const activityInsertResult = await activityInsert(
      employee_id,
      source_mail_id,
      target_mail_id,
      description,
      activity_id,
      activity_type
    );

    if (create_Activity) {
      // If the task is created successfully, return a success response
      Logger.info("Task created successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Task created successfully", create_Activity));
    } else {
      // If there is an error while creating the task, return an error response
      Logger.error("Error while creating Task", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while creating Task"));
    }
  } catch (error) {
    // Handle any exceptions that occur during the execution
    console.log(error);
    Logger.error(
      "Caught exception in creation of Task",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in creation of Task", error));
  }
};

export const update_Task = async (req, res) => {
  const {
    id,
    emp_id,
    firstName,
    date,
    activity,
    start_date,
    end_date,
    status,
  } = req.body;

  try {
    let act = {
      id: id,
      emp_id: emp_id,
      firstName: firstName,
      date: date,
      activity: activity,
      start_date: start_date,
      end_date: end_date,
      status: status,
    };

    // // Check if the status is "Done" and update end_date accordingly
    // if (status === "Done") {
    //   act.end_date = new Date(); // Set the end_date to the current date and time
    // }
    const update = await Activity_details.update(act, { where: { id: id } });
    if (update) {
      Logger.info("Task updated successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Task updated successfully", update));
    } else {
      Logger.error("Error while updating Task", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while updating Task"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in updating Task",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in updating Task", error));
  }
};

export const get_Task = async (req, res) => {
  try {
    var query = `SELECT * FROM newhrms."Activity_details"  WHERE id= ${req.params.emp_id} `;
    const get_Task = await db.query(query, [req.params.emp_id]);
    if (emp_id) {
      // If the post is created successfully, return a success response
      Logger.info("Task fetched successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Task fetched successfully", get_Task));
    } else {
      // If there is an error while creating the post, return an error response
      Logger.error("Error while creating Post", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while creating Task"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in creation of Task",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in creation of Task", error));
    throw new Error("Something went wrong");
  }
};

// Assuming you have imported necessary libraries and set up the database connection

export const get_All_Task = async (req, res) => {
  try {
    const query = `SELECT * FROM newhrms."Activity_details"`;
    const result = await db.query(query);

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved all tasks",
      result,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching tasks",
      error: error.message,
    });
  }
};

export const get_All_Task_By_EmployeeId = async (req, res) => {
  try {
    const emp_id = req.query.emp_id;
    var query = `SELECT * FROM newhrms."Activity_details"  where emp_id = '${emp_id}'`;
    const get_All_Task_By_EmployeeId = await db.query(query);
    if (emp_id) {
      Logger.info("Task fetched successfully", { service: service_module });
      return res
        .status(200)
        .json(
          OPERATION_SUCCESS(
            "Task fetched successfully",
            get_All_Task_By_EmployeeId
          )
        );
    } else {
      Logger.error("Error while creating Post", { service: service_module });
      return res
        .status(400)
        .json(OPERATION_FAILED("Error while creating Task"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in creation of Task",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in creation of Task", error));
    throw new Error("Something went wrong");
  }
};

export const delete_Task = async (req, res) => {
  try {
    const id = req.params.id;

    const selectQuery = `SELECT * FROM newhrms."Activity_details" WHERE id = '${id}'`;
    const taskToBeDeleted = await db.query(selectQuery, [id]);

    if (taskToBeDeleted.rows.length === 0) {
      return res
        .status(404)
        .json({ error: true, message: "Task not found", data: null });
    }

    const deleteQuery = `DELETE FROM newhrms."Activity_details" WHERE id = '${id}'`;
    await db.query(deleteQuery, [id]);

    // Step 3: Insert the deleted task into Activity_master
    const { del_Eid, emp_id, task_name, description } = taskToBeDeleted.rows[0];
    const insertQuery = `
      INSERT INTO newhrms."Activity_master" del_Eid, emp_id, task_name, description)
      VALUES ($1, $2, $3, $4)
    `;
    await db.query(insertQuery, [del_Eid, emp_id, task_name, description]);

    Logger.info("Task deleted and inserted into Activity_master successfully", {
      service: service_module,
    });

    return res.status(200).json({
      success: true,
      message: "Task deleted and inserted into Activity_master successfully",
      data: taskToBeDeleted.rows[0],
    });
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception while deleting and inserting task",
      { service: service_module },
      error
    );
    res.status(500).json({
      error: true,
      message: "Something went wrong",
      data: null,
    });
    throw new Error("Something went wrong");
  }
};

export const get_Activity_Status = async (req, res) => {
  try {
    const emp_id = req.query.emp_id;
    const query = `
    SELECT status_values.status, COALESCE(status_count, 0) AS status_count
    FROM (
      VALUES ('NEW'), ('INPROGRESS'), ('TESTING'), ('COMPLETED')
    ) AS status_values(status)
    LEFT JOIN (
      SELECT status, COUNT(*) AS status_count
      FROM newhrms."Activity_details"
      WHERE emp_id = '${emp_id}' AND status IN ('NEW', 'INPROGRESS', 'TESTING', 'COMPLETED')
      GROUP BY status
    ) AS status_counts ON status_values.status = status_counts.status;
    
    `;
    const activityStatusCount = await db.query(query);

    Logger.info("Activity status counts fetched successfully", {
      service: service_module,
    });
    return res.status(200).json({
      success: true,
      message: "Activity status counts fetched successfully",
      activityStatusCount,
    });
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in fetching activity status counts",
      { service: service_module },
      error
    );
    res.status(500).json({
      error: true,
      message: "Something went wrong",
      error,
    });
    throw new Error("Something went wrong");
  }
};

// export const getActiveDateById = async (req, res) => {
//   try {
//     const id = req.query.id;
//     const query = `SELECT start_date, end_date FROM newhrms."Activity_details" WHERE id = '${id}'`;
//     const [activityDetails] = await db.query(query);

//     if (activityDetails.length) {
//       const result = {
//         startDate:activityDetails[0].start_date.toISOString().slice(0, 10),
//         startTime:activityDetails[0].start_date.toISOString().slice(11, 30),
//         endDate:activityDetails[0].end_date.toISOString().slice(0, 10),
//         endTime:activityDetails[0].end_date.toISOString().slice(11, 30)
//       }
// console.log("---------",result)
//       Logger.info("Task fetched successfully", { service: service_module });
//       return res.status(200).json({
//         success: true,
//         message: "Task fetched successfully",result

//       });
//     } else {

//       Logger.error("No Task found for the provided ID", { service: service_module });
//       return res.status(404).json(OPERATION_FAILED("No Task found for the provided ID"));
//     }
//   } catch (error) {
//     console.log(error);
//     Logger.error("Caught exception in fetching Task details", { service: service_module }, error);
//     res.status(500).json(OPERATION_FAILED("Caught exception in fetching Task details", error));
//     throw new Error('Something went wrong');
//   }
// };

export const getActiveDateById = async (req, res) => {
  try {
    const id = req.query.id;
    const query = `SELECT start_date, end_date FROM newhrms."Activity_details" WHERE id = '${id}'`;
    const [activityDetails] = await db.query(query);

    if (activityDetails.length) {
      const start_date = new Date(activityDetails[0].start_date);
      const end_date = new Date(activityDetails[0].end_date);

      const result = {
        startDate: start_date.toISOString().slice(0, 10),
        startTime: start_date.toISOString().slice(11, 19),
        endDate: end_date.toISOString().slice(0, 10),
        endTime: end_date.toISOString().slice(11, 19),
        totalWorkingHours: calculateTotalWorkingHours(start_date, end_date),
      };

      Logger.info("Task fetched successfully", { service: service_module });
      return res.status(200).json({
        success: true,
        message: "Task fetched successfully",
        result,
      });
    } else {
      Logger.error("No Task found for the provided ID", {
        service: service_module,
      });
      return res
        .status(404)
        .json(OPERATION_FAILED("No Task found for the provided ID"));
    }
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in fetching Task details",
      { service: service_module },
      error
    );
    res
      .status(500)
      .json(
        OPERATION_FAILED("Caught exception in fetching Task details", error)
      );
    throw new Error("Something went wrong");
  }
};
