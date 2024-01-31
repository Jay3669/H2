import { DataTypes } from 'sequelize';
import db from "../config/db.js";

const Designations = db.define("Designations", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     departmentId: {
          type: DataTypes.STRING,
     },
     departmentName: {
          type: DataTypes.STRING,
     },
     designationId: {
          type: DataTypes.VIRTUAL,
     },
     designationName: {
          type: DataTypes.STRING,
     }
});

export default Designations;