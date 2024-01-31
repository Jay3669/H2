import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

const invite_team = db.define("invite_team", {
id:{
    type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
 },
 name:{
    type: DataTypes.STRING,
 },

 email:{
    type: DataTypes.STRING,
 } ,
 admin_email:{
   type: DataTypes.STRING,
} ,
password:{
   type: DataTypes.STRING,
},
 company:{
    type: DataTypes.STRING,
    },
 
role:{
   type: DataTypes.STRING,
},
status:{
   type: DataTypes.STRING,
   defaultValue:"not_accepted"
 },

});
export default invite_team;