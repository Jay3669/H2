import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

const document_type_company= db.define("document_type_company", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   
    document_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    organization:{
        type: DataTypes.STRING,

    }
});



export default document_type_company;
