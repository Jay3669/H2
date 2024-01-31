import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

const Activity_master = db.define("activity_master", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_id:{
    type: DataTypes.STRING,
  },
  del_Eid:{
    type: DataTypes.INTEGER,
  },
  source_mail_id: {
    type: DataTypes.STRING,
  },
  target_mail_id: {
    type: DataTypes.STRING,
    allowNull:true
  },
  description: {
    type: DataTypes.STRING,
  },
  activity_id: {
    type: DataTypes.INTEGER,
  },
 
  activity_type: {
    type: DataTypes.STRING,
  },
});
export default Activity_master;
