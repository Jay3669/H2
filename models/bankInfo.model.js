import { DataTypes } from 'sequelize';
import db from "../config/db.js"

const Bank_Info = db.define("Bank_Info", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     _id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
     },
     nameAsInTheAccount: {
          type: DataTypes.STRING,
     },
     bankName: {
          type: DataTypes.STRING,
     },
     bankBranch: {
          type: DataTypes.STRING,
     },
     accountNumber: {
          type: DataTypes.STRING,
     },
     ifsc: {
          type: DataTypes.STRING,
     },
     accountType: {
          type: DataTypes.STRING,
     },
});

export default Bank_Info;
