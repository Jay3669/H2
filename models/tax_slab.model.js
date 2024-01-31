import { Sequelize, DataTypes, STRING } from "sequelize";
import db from "../config/db.js";


const tax_slab = db.define("tax_slab" ,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tax_code:{
        type:DataTypes.STRING
    },
    lower_range:{
        type:DataTypes.INTEGER
     },
    higher_range:{
        type:DataTypes.INTEGER
    },
    fixed_deduction:{
        type:DataTypes.STRING
    },
    percentage_deduction:{
        type:DataTypes.STRING
    },
    taxable_income:{
        type:DataTypes.STRING
    },
    rates_of_tax:{
        type:DataTypes.STRING
    },
    year:{
        type:DataTypes.INTEGER
    }


});
export default tax_slab