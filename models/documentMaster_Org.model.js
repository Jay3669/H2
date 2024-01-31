import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

const document_master_company = db.define("document_company", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    document_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
   
    document: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company:{
        type: DataTypes.STRING,
    },
    default:{
        type: DataTypes.BOOLEAN
    }

});



export default document_master_company;
