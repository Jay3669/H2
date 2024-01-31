import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

let adminCount = 0;
let hrCount = 0;
let managerCount = 0;

const Hr_details = db.define("hr_details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ids: {
    type: DataTypes.STRING,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.BIGINT,
  },
  location: {
    type: DataTypes.STRING,
  },
  about: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  accessToken: {
    type: DataTypes.STRING,
  },
  pic: {
    type: DataTypes.TEXT,
  },
  company: {
    type: DataTypes.STRING,
  },
});

Hr_details.beforeCreate((hr, options) => {
  // Generate a unique ID based on role and an auto-incremented number
  let count;
  let rolePrefix;

  if (hr.role === 'Hr') {
    hrCount++;
    count = hrCount;
    rolePrefix = 'HR';
  } else if (hr.role === 'Manager') {
    managerCount++;
    count = managerCount;
    rolePrefix = 'MANAG';
  } else if (hr.role === 'Admin') {
    adminCount++;
    count = adminCount;
    rolePrefix = 'ADM';
  }

  // Format the count to be four digits
  const formattedCount = count.toString().padStart(4, '0');

  // Set the ID based on the role and count
  hr.ids = `${rolePrefix}${formattedCount}`;
});

export default Hr_details;
