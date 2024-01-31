import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Job_Info = db.define("Job_Info", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     _id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
     },
     jobTitle: {
          type: DataTypes.STRING
     },
     jobDescription: {
          type: DataTypes.TEXT
     },
     joiningDate: {
          type: DataTypes.DATE,
     },
     relievingDate: {
          type: DataTypes.DATE,
     },
     employeeType: {
          type: DataTypes.STRING
     },
     employeeShift: {
          type: DataTypes.STRING
     },
     companyName: {
          type: DataTypes.STRING
     },
     branchName: {
          type: DataTypes.STRING
     },
     department: {
          type: DataTypes.STRING
     },
     designation: {
          type: DataTypes.STRING
     },
     reportingToId: {
          type: DataTypes.STRING
     },
     reportingTo: {
          type: DataTypes.STRING
     },
     assetsProvidedTo: {
          type: DataTypes.JSON
     }
});

export default Job_Info;