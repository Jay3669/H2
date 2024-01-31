import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

const document_type_details = db.define("document_type_details", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   
    document_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company:{
        type: DataTypes.STRING,

    }
});



export default document_type_details;
