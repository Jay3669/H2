import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Basic_Info = db.define("Basic_Info", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     _id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
     },
     applicationNo: {
          type: DataTypes.STRING,
     },
     userId: {
          type: DataTypes.STRING,
     },
     role: {
          type: DataTypes.JSON,
     },
     firstName: {
          type: DataTypes.STRING,
     },
     middleName: {
          type: DataTypes.STRING,
     },
     lastName: {
          type: DataTypes.STRING,
     },
     userName: {
          type: DataTypes.STRING,
     },
     dob: {
          type: DataTypes.DATE,
     },
     gender: {
          type: DataTypes.STRING,
     },
     maritalStatus: {
          type: DataTypes.STRING,
     },
     mobileNumber: {
          type: DataTypes.BIGINT,
     },
     personalEmail: {
          type: DataTypes.STRING,
          validate: {
               isEmail: true,
          },
     },
     email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
               isEmail: true,
          },
     },
     password: {
          type: DataTypes.STRING,
     },
     profilePic: {
          type: DataTypes.TEXT,
     },
     permanent_address_line_1: {
          type: DataTypes.STRING
     },
     permanent_address_line_2: {
          type: DataTypes.STRING
     },
     permanent_city: {
          type: DataTypes.STRING
     },
     permanent_state: {
          type: DataTypes.STRING
     },
     permanent_country: {
          type: DataTypes.STRING
     },
     permanent_zip_code: {
          type: DataTypes.STRING(6)
     },
     residential_address_line_1: {
          type: DataTypes.STRING
     },
     residential_address_line_2: {
          type: DataTypes.STRING
     },
     residential_city: {
          type: DataTypes.STRING
     },
     residential_state: {
          type: DataTypes.STRING
     },
     residential_country: {
          type: DataTypes.STRING
     },
     residential_zip_code: {
          type: DataTypes.STRING(6)
     },
     status: {
          type: DataTypes.STRING,
     },
     accessToken: {
          type: DataTypes.TEXT,
     },
});

export default Basic_Info;