import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Branch = db.define("Branch", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     companyId: {
          type: DataTypes.INTEGER,
     },
     companyName: {
          type: DataTypes.STRING,
     },
     managerId: {
          type: DataTypes.STRING,
     },
     managerName: {
          type: DataTypes.STRING,
     },
     branchId: {
          type: DataTypes.STRING,
     },
     branchName: {
          type: DataTypes.STRING,
     },
     branchType: {
          type: DataTypes.STRING,
     },
     branchLocation: {
          type: DataTypes.STRING,
     },
     email: {
          type: DataTypes.STRING,
          validate: {
               isEmail: true,
          },
     },
     mobileNumber: {
          type: DataTypes.BIGINT,
     },
     PAN: {
          type: DataTypes.STRING,
     },
     TAN: {
          type: DataTypes.STRING,
     },
     GST: {
          type: DataTypes.STRING,
     },
     logo: {
          type: DataTypes.TEXT,
     },
     address: {
          type: DataTypes.JSON,
     }
});

export default Branch;