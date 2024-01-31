import { DataTypes } from 'sequelize';
import db from "../config/db.js";

const Departments = db.define("Departments", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     branchId: {
          type: DataTypes.STRING,
     },
     branchName: {
          type: DataTypes.STRING,
     },
     departmentId: {
          type: DataTypes.STRING,
     },
     departmentName: {
          type: DataTypes.STRING,
     },
});

export default Departments;