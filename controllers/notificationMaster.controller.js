import db from "../config/db.js";
const service_module = "NOTIFICATION_MASTER";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import Logger from "../config/logger.js";
import { notificationInsert } from "../functions/notificationInsert.function.js";
import Notification_master from "../models/notificationMaster.model.js";
import { query } from "express";


export const getAllHrNotifications = async (req, res) => {
    try {
        const notifications = await db.query (`SELECT
        nm.id As id,
        nm.source_mail_id,
        nm.target_mail_id,
        nm.notification_id AS notification_id,
        nm.notification_type,
        nm.description,
        nm.is_read,
        nm.is_delete,
        nm."createdAt" AS notification_createdAt,
        nm."updatedAt" AS notification_updatedAt,
        nm."empLeave_id", 
        ed.pic AS employee_pic
    FROM newhrms.notification_masters AS nm
    INNER JOIN newhrms.employee_details AS ed ON nm.source_mail_id = ed.email
    WHERE nm.target_mail_id = '${req.query.target_mail_id}'`);

        // Notification_master.findAll({
        //     where: {target_mail_id : req.query.target_mail_id}});

        if (notifications) {
            // If the post is created successfully, return a success response
            Logger.info("Notifications fetched successfully", { service: service_module });
            return res
                .status(200)
                .json(OPERATION_SUCCESS("Notifications fetched successfully", notifications));
        } else {
            // If there is an error while creating the post, return an error response
            Logger.error("Error while creating Post", { service: service_module });
            return res
                .status(400)
                .json(OPERATION_FAILED("Error while creating Notifications"));
        }
    } catch (error) {
        console.log(error);
        Logger.error(
            "Caught exception in creation of Notifications",
            { service: service_module },
            error
        );
        res

            .status(400)
            .json(OPERATION_FAILED("Caught exception in creation of Notifications", error));
    }

};
    
