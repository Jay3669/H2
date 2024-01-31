import { DataTypes } from 'sequelize';
import db from "../config/db.js"

const Payroll_Info = db.define("Payroll_Info", {
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     _id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
     },
     ctc: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     grossSalary: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     basicSalary: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     netPay: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     houseRentAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     conveyanceAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     specialAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     overtimeAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     medicalAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     otherAllowances: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     dearnessAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     entertainmentAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     transportAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     leaveTravelAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     bonus: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     otherTaxableAllowances: {
          type: DataTypes.JSON
     },
     uniformAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     compensatoryAllowances: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     sumptuaryAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     helperAllowance: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     otherTaxFreeAllowances: {
          type: DataTypes.JSON
     },
     providentFund: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     professionalTax: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     labourWelfareFund: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     loan: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     esi: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     incomeTax: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     otherDeductions: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     variablePay: {
          type: DataTypes.DOUBLE,
          defaultValue: 0
     },
     PR_Value: {
          type: DataTypes.STRING,
     },
     HRA_Value: {
          type: DataTypes.STRING,
     },
     PF_Value: {
          type: DataTypes.STRING,
     },
     ESI_Value: {
          type: DataTypes.STRING,
     },
     paymentMode: {
          type: DataTypes.STRING,
     }
});

export default Payroll_Info;
