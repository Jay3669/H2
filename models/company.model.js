import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Company = db.define("Company", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     companyName: {
          type: DataTypes.STRING,
     },
     TAN: {
          type: DataTypes.STRING,
     },
     PAN: {
          type: DataTypes.STRING,
     },
     GST: {
          type: DataTypes.STRING,
     },
     companyLogo: {
          type: DataTypes.TEXT,
     },
     industryVertical: {
          type: DataTypes.STRING,
     },
     mobileNumber: {
          type: DataTypes.BIGINT,
          allowNull: false,
          validate: {
               notEmpty: true,
               isNumeric: true,
          }
     },
     email: {
          type: DataTypes.STRING,
          validate: {
               isEmail: true,
          },
     },
     website: {
          type: DataTypes.STRING,
     },
     address: {
          type: DataTypes.JSON,
     },
     status: {
          type: DataTypes.STRING,
     }
});

export default Company;