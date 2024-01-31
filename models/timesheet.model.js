import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Sequelize } from "sequelize";

const timesheet_details = db.define("timesheet_details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
emp_id:{
  type: DataTypes.STRING
},
date:{
  type: DataTypes.DATE
},
start_time:{
  type: DataTypes.TIME
},
end_time:{
  type: DataTypes.TIME
},
total_time:{
  type: DataTypes.TIME
},
status:{
  type: DataTypes.STRING
},
description:{
  type: DataTypes.STRING
},
emp_type:{
  type: DataTypes.STRING
},
work_hrs:{
  type: DataTypes.INTEGER
},
actual_hrs:{
  type: DataTypes.INTEGER
},
total_hrs:{
  type: DataTypes.INTEGER
}
});
export default timesheet_details;
