import db from "../config/db.js";
import Activity_master from "../models/activitymaster.model.js";

export const activityInsert = async (
  employee_id,
  source_mail_id,
  target_mail_id,
  description,
  activity_id,
  activity_type,
) => {
  let obj = {
    employee_id : employee_id,
    source_mail_id: source_mail_id,
    target_mail_id: target_mail_id,
    description: description,
    activity_id: activity_id,
    activity_type: activity_type,
  };
  const insert = await Activity_master.create(obj);
};
