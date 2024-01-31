import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

const Notification_master = db.define("notification_master", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  source_mail_id: {
    type: DataTypes.STRING,
  },
  target_mail_id: {
    type: DataTypes.STRING,
    allowNull:true
  },
  
  notification_id: {
    type: DataTypes.INTEGER,
  },
  notification_type: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue:'false'
  },
 
  is_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: 'false'
  },
  empLeave_id :{
    type: DataTypes.STRING
  }
});
export default Notification_master;
