import { DataTypes } from 'sequelize';
import db from "../config/db.js"

const Documents_Info = db.define("Documents_Info", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     _id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
     },
     resume: {
          type: DataTypes.TEXT
     },
     identityProofs: {
          type: DataTypes.JSON
     },
     educationCertificates: {
          type: DataTypes.JSON,
     },
     experienceCertificates: {
          type: DataTypes.JSON,
     }
});

export default Documents_Info;
