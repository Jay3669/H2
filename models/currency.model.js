import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Sequelize } from "sequelize";

const currency_details = db.define("currency_details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  country:{
    type: DataTypes.STRING
  },
  currency_name: {
    type: DataTypes.STRING
  },
  symbol: {
    type: DataTypes.STRING
  },
});
export default currency_details;
