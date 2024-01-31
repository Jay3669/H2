import { Sequelize, DataTypes, STRING } from "sequelize";
import db from "../config/db.js";

const Manager_details = db.define("manager_details", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    mang_id: {
        type: DataTypes.STRING,
    },
    manager_name: {
        type: DataTypes.STRING,
    },
    role: {
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
    phoneNo: {
        type: DataTypes.INTEGER,
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
    address: {
        type: DataTypes.STRING,
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
    company: {
        type: DataTypes.STRING,
    },
    
});
export default Manager_details;
