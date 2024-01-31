import { Sequelize, DataTypes, STRING } from "sequelize";
import db from "../config/db.js";

const Employee_Certificates = db.define("Employee_Certificates", {
    emp_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    certificateName: {
        type: DataTypes.STRING,
    },
    certificate: {
        type: DataTypes.TEXT,
    },
    documentType: {
        type: DataTypes.STRING,
    },
});

export default Employee_Certificates;
