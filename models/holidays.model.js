import { Sequelize, DataTypes, STRING } from "sequelize";
import db from "../config/db.js";
const Holidays_list = db.define("holidays_list", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    holiday_name:{
        type: DataTypes.STRING
    },
    holiday_date:{
        type: DataTypes.DATE
    },
    description:{
        type: DataTypes.STRING
    },
    company:{
        type: DataTypes.STRING
    },
    hr_id:{
        type: DataTypes.STRING
    }
});
export default Holidays_list;