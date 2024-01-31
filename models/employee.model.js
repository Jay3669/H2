import { Sequelize, DataTypes, STRING } from "sequelize";
import db from "../config/db.js";

const Employee_details = db.define("employee_details", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    emp_id: {
        type: DataTypes.STRING,
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
    emp_name: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
    },
    aadhar_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pan_num: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    voter_card:{
        type: DataTypes.STRING,
    },
    DOB: {
        type: DataTypes.DATE,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    permanentNumber: {
        type: DataTypes.JSON,
    },
    temporaryNumber: {
        type: DataTypes.JSON,
    },
    type: {
        type: DataTypes.STRING,
    },
    accessToken: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    pic: {
        type: DataTypes.TEXT,
    },
    marital_status: {
        type: DataTypes.STRING,
    },
    designation: {
        type: DataTypes.STRING,
    },
    permanent_address: {
        type: DataTypes.JSON,
    },
    temporary_address: {
        type: DataTypes.JSON,
    },
    state: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    pincode: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
    },
    manager_id: {
        type: DataTypes.STRING,
    },
    hr_id: {
        type: DataTypes.STRING,
    },
    company: {
        type: DataTypes.STRING,
    },
    emp_shift: {
        type: DataTypes.STRING,
    },
    joining_date: {
        type: DataTypes.DATE,
    },
    relieving_date: {
        type: DataTypes.DATE,
    },
});
export default Employee_details;
