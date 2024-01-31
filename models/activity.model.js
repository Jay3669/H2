import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

const Activity_details = db.define("Activity_details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  //
  emp_id:{
    type: DataTypes.STRING,
  },
  firstName:{
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
  activity_name: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity_description:{
    type: DataTypes.STRING,
  },
  estimated_time:{
    type: DataTypes.TIME,
  },
  emp_pic:{
    type: DataTypes.STRING,
},
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  status :{
    type:DataTypes.STRING,
  },
  assignedBy:{
    type:DataTypes.STRING
  },
});

export default Activity_details;