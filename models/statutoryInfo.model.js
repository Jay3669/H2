import { DataTypes } from 'sequelize';
import db from "../config/db.js"

const Statutory_Info = db.define("Statutory_Info", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     _id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
     },
     aadharNumber: {
          type: DataTypes.STRING,
     },
     panNumber: {
          type: DataTypes.STRING,
     },
     uanNumber: {
          type: DataTypes.STRING,
     },
     pfNumber: {
          type: DataTypes.STRING,
     },
     esiNumber: {
          type: DataTypes.STRING,
     },
     voterId: {
          type: DataTypes.STRING,
     },
});

export default Statutory_Info;