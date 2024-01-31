import db from "../config/db.js";
const service_module = "holidays_details";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import Logger from "../config/logger.js";
import Holidays_list from "../models/holidays.model.js";


export const create_holidays = async(req,res) =>{
    const {hr_id,holiday_name,holiday_date,description,company} = req.body;
    try{
        const checkdata = await Holidays_list.findOne({
            where:{holiday_name:holiday_name}
        })
        if(checkdata){
            return res.status(400).json(OPERATION_FAILED("Holiday already exists"));
        }
        const holidays = {
            holiday_name:holiday_name,
            holiday_date:holiday_date,
            description:description,
            company:company,
            hr_id:hr_id
        }
        const create_holidays = await Holidays_list.create(holidays);
        if(create_holidays){
            return res.status(200).json(OPERATION_SUCCESS("Holiday created successfully",create_holidays));
        }
    }
    catch(error){
        Logger.error("Caught exception in creation of Holiday",{service:service_module},error);
        res.status(400).json(OPERATION_FAILED("Caught exception in creation of Holiday",error));
    }
}

export const get_holidays = async(req,res) =>{
    try{
        const get_holidays = await Holidays_list.findAll();
        if(get_holidays){
            return res.status(200).json(OPERATION_SUCCESS("Holidays fetched successfully",get_holidays));
        }
    }
    catch(error){
        Logger.error("Caught exception in fetching Holidays",{service:service_module},error);
        res.status(400).json(OPERATION_FAILED("Caught exception in fetching Holidays",error));
    }
}

export const get_holidays_by_Company = async(req,res) =>{
    const company = req.query.company;
    try{
        const get_holidays = await Holidays_list.findAll({where:{company:company}});
        if(get_holidays){
            return res.status(200).json(OPERATION_SUCCESS("Holidays fetched successfully",get_holidays));
        }
    }
    catch(error){
        Logger.error("Caught exception in fetching Holidays",{service:service_module},error);
        res.status(400).json(OPERATION_FAILED("Caught exception in fetching Holidays",error));
    }
}

export const get_holidays_by_hr = async(req,res) =>{
    const hr_id = req.query.hr_id;
    try{
        const get_holidays = await Holidays_list.findAll({where:{hr_id:hr_id}});
        if(get_holidays){
            return res.status(200).json(OPERATION_SUCCESS("Holidays fetched successfully",get_holidays));
        }
    }
    catch(error){
        Logger.error("Caught exception in fetching Holidays",{service:service_module},error);
        res.status(400).json(OPERATION_FAILED("Caught exception in fetching Holidays",error));
    }
}