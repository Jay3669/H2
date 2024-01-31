import { Sequelize, DataTypes, STRING } from "sequelize";
import db from "../config/db.js";

const Employee_Loans = db.define("Employee_Loans", {
    emp_id: {
        type: DataTypes.STRING,
    },
    loanAmount: {
        type: DataTypes.INTEGER,
    },
    loanAmountPerMonth: {
        type: DataTypes.INTEGER,
    },
    loanPeriod: {
        type: DataTypes.INTEGER,
    },
    loanDescription: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "HOLD"
    }
});

export default Employee_Loans;
