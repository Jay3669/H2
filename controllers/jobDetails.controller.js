import Logger from "../config/logger.js";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
const service_module = "JOB_DETAILS_MODULE";
import db from "../config/db.js";
import JobDetails from "../models/jobDetails.model.js";


export const create_job_details = async(req,res) =>{
    const { job_code,
        job_title,
        job_description,
        job_location,
        num_openings,
        employmentType,
        min_exp,
        max_exp,
        salary,
        qualifications,
        skills,
        experience,
        preferred_industry,
        certification,
        department,
        closingDate,} = req.body;
    try{
        const checkdata = await JobDetails.findOne({
            where:{job_title:job_title}
        })
        if(checkdata){
            return res.status(400).json(OPERATION_FAILED("job_title already exists"));
        }
        const data = {
              job_code,
              job_title,
              job_description,
              job_location,
              num_openings,
              employmentType,
              min_exp,
              max_exp,
              salary,
              qualifications,
              skills,
              experience,
              preferred_industry,
              certification,
              department,
              closingDate,
        }
        const create_job = await JobDetails.create(data);
        if(create_job){
            return res.status(200).json(OPERATION_SUCCESS("job created successfully",create_job));
        }
    }catch(error){
        console.log(error);
        Logger.error("Caught exception in job_details creation", {service:service_module}, error);
        return res.status(400).json(OPERATION_FAILED("An error occured while creating job_details"));
    }
}
       

export const get_all_job_details = async(req,res) =>{
        try {
          const data = await JobDetails.findAll(
            {
              where: {
                job_title: req.params.job_title
              }
            }
          );
          return res.status(200).json(OPERATION_SUCCESS("retrieved successfully",data));
        } catch (error) {
          console.log(error);
          Logger.error("caught exception in job_details creation", {service:service_module}, error);
          return res.status(400).json(OPERATION_FAILED("An error occured while creating job_details"));
        }
      }
      



export const update_job_details = async(req,res) =>{
    const { job_code,
        job_title,
        job_description,
        job_location,
        num_openings,
        employmentType,
        min_exp,
        max_exp,
        salary,
        qualifications,
        skills,
        experienceLevel,
        preferred_industry,
        certification,
        department,
        closingDate,} = req.body;
    try{
        const checkdata = await JobDetails.findOne({
            where:{job_code:job_code}
        })
        if(checkdata){
            return res.status(400).json(OPERATION_FAILED("job_title already exists"));
        }
        const data = {
              job_code,
              job_title,
              job_description,
              job_location,
              num_openings,
              employmentType,
              min_exp,
              max_exp,
              salary,
              qualifications,
              skills,
              experienceLevel,
              preferred_industry,
              certification,
              department,
              closingDate,
        }
        const update_job = await JobDetails.update(data,{
            where:{job_code}
        });
        if(update_job){
            return res.status(200).json(OPERATION_SUCCESS("job_details updated successfully",update_job));
        }
    }catch(error){
        console.log(error);
        Logger.error("Caught exception in job_details creation", {service:service_module}, error);
        return res.status(400).json(OPERATION_FAILED("An error occured while updating job_details"));
    }
}

    

export const get_details_by_jobCode = async(req,res) =>{
    try {
      const data = await JobDetails.findOne(
        {
          where: {
            job_code: req.params.job_code
          }
        }
      );
      return res.status(200).json(OPERATION_SUCCESS("retrieved successfully",data));
    } catch (error) {
      console.log(error);
      Logger.error("caught exception in job_details creation", {service:service_module}, error);
      return res.status(400).json(OPERATION_FAILED("An error occured while creating job_details"));
    }
}


export const delete_job_details = async(req,res) =>{
    try {
      const data = await JobDetails.destroy(
        {
          where: {
            job_code: req.params.job_code
          }
        }
      );
      return res.status(200).json(OPERATION_SUCCESS("deleted successfully",data));
    } catch (error) {
      console.log(error);
      Logger.error("caught exception in job_details creation", {service:service_module}, error);
      return res.status(400).json(OPERATION_FAILED("An error occured while creating job_details"));
    }
}