import { Sequelize, DataTypes, STRING } from "sequelize";
import db from "../config/db.js";

const Employee_Bank = db.define("Employee_Bank", {

          emp_detail_id: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING, 
            allowNull: false,
          },
          bank_name:{ 
            type:DataTypes.STRING
          },
          bank_branch:{
            type: DataTypes.STRING
          },
          account_num:{
            type: DataTypes.INTEGER
          },
          ifsc:{
            type:DataTypes.STRING
          },
          account_type:{
            type:DataTypes.STRING
          }
        }
      );
export default Employee_Bank;
      