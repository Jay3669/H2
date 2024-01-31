import db from "../config/db.js";
import Notification_master from "../models/notificationMaster.model.js";

export const notificationInsert = async (
  source_mail_id,
  target_mail_id,
  description,
  notification_id,
  notification_type,
  empLeave_id
) => {
  let obj = {
    source_mail_id: source_mail_id,
    target_mail_id: target_mail_id,
    description: description,
    notification_id: notification_id,
    notification_type: notification_type,
    empLeave_id : empLeave_id
  };
  const insert = await Notification_master.create(obj);
};
