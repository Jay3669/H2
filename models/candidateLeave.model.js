import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

const candidate_leave = db.define("candidate_leave", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp_id:{
    type: DataTypes.STRING,
  },
  emp_name:{
    type: DataTypes.STRING,
  },
  leave_from:{
    type: DataTypes.DATE,
  },
  leave_to: {
    type: DataTypes.DATE,
  },
  leave_type: {
    type: DataTypes.STRING,
  },
  leave_reason: {
    type: DataTypes.STRING,
  },
  leave_status: {
    type: DataTypes.STRING,
  },
  attachments:{
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  request_to:{
    type: DataTypes.STRING,
  },
  approved_by:{
    type: DataTypes.STRING,
  },
  total_leaves:{
    type: DataTypes.INTEGER,
  },
  leave_days:{
    type: DataTypes.INTEGER,
  },
  session:{
    type: DataTypes.STRING
  },
  remaining_leaves:{
    type: DataTypes.INTEGER
  },
  sender_email :{
    type: DataTypes.STRING
  }
  });
export default candidate_leave;
