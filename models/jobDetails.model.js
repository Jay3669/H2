import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js"

const JobDetails = db.define('Job_Details', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  job_code:{
    type: DataTypes.STRING,
  },
  job_title: {
    type: DataTypes.STRING,
  },
  job_description: {
    type: DataTypes.TEXT,
  },
  job_location: {
    type: DataTypes.STRING,
  },
  num_openings: {
    type: DataTypes.INTEGER,
  },
  employmentType: {
    type: DataTypes.STRING,
  },
  min_exp:{
    type: DataTypes.INTEGER,
  },
  max_exp:{
    type: DataTypes.INTEGER,
  },
  salary:{
    type: DataTypes.INTEGER,
  },
  qualifications: {
    type: DataTypes.STRING,
  },
  skills:{
    type: DataTypes.STRING,
  },
  experience: {
    type: DataTypes.STRING,
  },
  preferred_industry:{
    type: DataTypes.STRING,
  },
  certification:{
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,

  },
  closingDate: {
    type: DataTypes.DATE,
 
  }
});


export default JobDetails;
