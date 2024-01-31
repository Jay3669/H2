import { Sequelize, DataTypes, STRING } from "sequelize";
import db from "../config/db.js";
const Employee_payrole = db.define("employee_payrole", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    emp_id:{
        type: DataTypes.STRING
    },
    emp_name:{
        type: DataTypes.STRING
    },
    emp_pic:{
        type: DataTypes.STRING
    },
    include_payrole:{
        type: DataTypes.STRING
    },
    salary_month:{
        type: DataTypes.DATE
    },
    gross:{
        type: DataTypes.DOUBLE
    },
    BasicSalary:{
        type: DataTypes.DOUBLE
    },
    include_PF:{
        type: DataTypes.STRING
    },
    ProvidentFund:{
        type: DataTypes.INTEGER
    },
    ConveyanceAllowance:{
        type: DataTypes.INTEGER
    },
    include_ESI:{
        type: DataTypes.STRING
    },
    ESI:{
        type: DataTypes.INTEGER
    },
    include_HRA:{
        type: DataTypes.STRING
    },
    HouseRentAllowance:{
        type: DataTypes.INTEGER
    },
    ProfessionalTax:{
        type: DataTypes.INTEGER
    },
    MedicalAllowance:{
        type: DataTypes.INTEGER
    },
    IncomeTax:{
        type: DataTypes.INTEGER
    },
    TravelAllowance:{
        type: DataTypes.INTEGER
    },
    Loan:{
        type: DataTypes.INTEGER
    }, 
    OtherDeductions:{
        type: DataTypes.JSON
        // ARRAY(DataTypes.STRING),
    },
    OtherAllowances:{
        type: DataTypes.JSON
    },
    PerformancePay:{
        type: DataTypes.INTEGER
    },
    NightShiftAllowance:{
        type: DataTypes.INTEGER
    },
    Overtime:{
        type: DataTypes.INTEGER
    }, 
    Bonus:{
        type: DataTypes.INTEGER
    },
    SpecialAllowance:{
        type: DataTypes.INTEGER
    },
    ctc:{
        type: DataTypes.INTEGER
    },
    netPay:{
        type: DataTypes.DECIMAL
    },
    ctc_accept_manag:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    manager_id:{
        type: DataTypes.STRING
    },
    send_slip:{
        type: DataTypes.STRING,
    },
    company:{
        type: DataTypes.STRING
    },
    payment_date:{
        type: DataTypes.DATE
    },
    payslip_number:{
        type: DataTypes.INTEGER
    },
    VariablePay:{
        type: DataTypes.INTEGER
    }

});
export default Employee_payrole;