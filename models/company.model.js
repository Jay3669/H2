import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Sequelize } from "sequelize";

const company_details = db.define("company_details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company: {
    type: DataTypes.STRING,
  },
  primary_industry: {
    type: DataTypes.STRING,
  },
  pic: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.STRING,
  },
  hr_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  employees: {
    type: DataTypes.STRING,
  },
  about: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  head_quarters: {
    type: DataTypes.STRING,
  },
  encrypted_password: {
    type: DataTypes.STRING,
    allowfull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowfull: false,
  },
  phone: {
    type: DataTypes.BIGINT,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  time_zone: {
    type: DataTypes.DATE,
  },
  manager_ids:{
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
});
export default company_details;
