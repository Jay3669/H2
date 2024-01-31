import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
const service_module = "PAYROLE";
import Logger from "../config/logger.js";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import db from "../config/db.js";
// const { format } = require("util");
import { Sequelize } from 'sequelize';

import path from "path";
import bodyParser from "body-parser";
import Employee_payrole from "../models/empPayrole.model.js";
import Employee_details from "../models/employee.model.js";
import { notificationInsert } from "../functions/notificationInsert.function.js";
import Manager_details from "../models/manager.model.js";
import Employee_Bank from "../models/empBank.model.js";
import payroleMaster from "../models/payroleMaster.model.js";


export const createPayrole = async (req, res) => {
  const { candidates } = req.body;

  try {
    const payrolls = [];

    if (!candidates || candidates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No candidates provided in the request.",
      });
    }

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      const getemp = await Employee_details.findOne({
        where: { emp_id: candidate.emp_id },
      });

      if (!getemp) {
        return res.status(404).json({
          success: false,
          message: `Employee not found for emp_id: ${candidate.emp_id}`,
        });
      }

      const emp_name = getemp.emp_name;
      const emp_pic = getemp.pic;
      const manager_id = getemp.manager_id;

      const payslip_number = (
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
      ).toString();

      let otherDeductions = Array.isArray(candidate.OtherDeductions) ? candidate.OtherDeductions : [];
      let otherAllowances = Array.isArray(candidate.OtherAllowances) ? candidate.OtherAllowances : [];
      const basicSalary = candidate.gross;
      if (basicSalary === candidate.gross) {
        return res.status(400).json({
          success: false,
          message: "Basic salary is equal to the gross salary. Please check your input data.",
        });
      }
      // Calculate Provident Fund based on basic salary condition
      // const basicSalary = candidate.BasicSalary;
      let providentFund = 0;

      if (candidate.include_PF === 'YES' && basicSalary >= 15000) {
        providentFund = 1800;
      } else if (candidate.include_PF === 'YES' && basicSalary < 14999 && basicSalary > 0) {
        providentFund = 0.12 * basicSalary;
      }

      // Calculate HRA based on metro or non-metro city
      let hraPercentage = candidate.include_HRA === 'METRO' ? 0.5 : 0.4;
      const houseRentAllowance = hraPercentage * basicSalary;

      // Calculate Professional Tax based on gross pay condition
      const grossPay = candidate.gross;
      let professionalTax = 0;
      if (grossPay >= 20001) {
        professionalTax = 200;
      } else if (grossPay >= 15001) {
        professionalTax = 150;
      } else if (grossPay <= 15000) {
        professionalTax = 0;
      }
// Calculate ESI based on a fixed percentage (adjust as per your region's regulations)
const esiPercentage = 4; 
const esiMaxLimit = 21000;  

// Check if ESI is applicable
let esi = 0;

if (candidate.include_ESI === 'YES' && grossPay <= esiMaxLimit) {
  esi = (esiPercentage / 100) * grossPay;

  // Check if the calculated ESI exceeds a maximum limit (adjust as per your region's regulations)
  const maxEsiLimit = 21000; // Example limit, adjust as needed

  esi = esi > maxEsiLimit ? maxEsiLimit : esi;
}  

 const totalDeductions = providentFund + esi +
        professionalTax  + candidate.IncomeTax + candidate.Loan + 
        otherDeductions.reduce((acc, deduction) => acc + deduction.amount, 0);

        const ctc = grossPay + totalDeductions + candidate.VariablePay;

        const netPay = grossPay - totalDeductions;
  

      const pay = {
        emp_id: candidate.emp_id,
        emp_name: emp_name,
        manager_id: manager_id,
        emp_pic: emp_pic,
        salary_month: candidate.salary_month,
        BasicSalary: basicSalary,
        gross: grossPay,
        ProvidentFund: providentFund,
        ConveyanceAllowance: candidate.ConveyanceAllowance,
        ESI: esi,
        HouseRentAllowance: houseRentAllowance,
        ProfessionalTax: professionalTax,
        MedicalAllowance: candidate.MedicalAllowance,
        IncomeTax: candidate.IncomeTax,
        TravelAllowance: candidate.TravelAllowance,
        Loan: candidate.Loan,
        OtherDeductions: otherDeductions,
        OtherAllowances: otherAllowances,
        PerformancePay: candidate.PerformancePay,
        NightShiftAllowance: candidate.NightShiftAllowance,
        Overtime: candidate.Overtime,
        Bonus: candidate.Bonus,
        SpecialAllowance: candidate.SpecialAllowance,
        ctc: ctc,
        netPay: netPay,
        payslip_number: payslip_number,
        include_payrole:candidate.include_payrole,
        include_PF:candidate.include_PF,
        include_ESI:candidate.include_ESI,
        include_HRA:candidate.include_HRA,
        VariablePay:candidate.VariablePay,
       
      };

      // Create entry in Employee_payroll table
      const payrole = await Employee_payrole.create(pay);
      await payrole.update({ send_slip: 'HOLD' });

      const updatePayrollMaster = await payroleMaster.update(
        {
          salary_month: candidate.salary_month,
          BasicSalary: pay.BasicSalary,
          gross: pay.gross,
          ProvidentFund: pay.ProvidentFund,
          ConveyanceAllowance: candidate.ConveyanceAllowance,
          ESI: pay.ESI,
          HouseRentAllowance: candidate.HouseRentAllowance,
          ProfessionalTax: pay.ProfessionalTax,
          MedicalAllowance: candidate.MedicalAllowance,
            IncomeTax: candidate.IncomeTax,
            TravelAllowance: candidate.TravelAllowance,
            Loan: candidate.Loan,
            OtherDeductions: otherDeductions,
            OtherAllowances: otherAllowances,
            PerformancePay: candidate.PerformancePay,
            NightShiftAllowance: candidate.NightShiftAllowance,
            Overtime: candidate.Overtime,
            Bonus: candidate.Bonus,
            SpecialAllowance: candidate.SpecialAllowance,
            ctc: candidate.ctc,
            netPay: candidate.netPay,
            payslip_number: payslip_number,
            send_slip:payrole.send_slip,
            include_payrole:candidate.include_payrole,
            include_PF:candidate.include_PF,
            include_ESI:candidate.include_ESI,
            include_HRA:candidate.include_HRA,
            VariablePay:candidate.VariablePay,
         

        },
        {
          where: { emp_id: candidate.emp_id },
        }
      );

      if (!updatePayrollMaster) {
        console.error(`Failed to update payroleMaster for emp_id: ${candidate.emp_id}`);
      }

      payrolls.push(payrole);
    }

    return res.status(200).json({
      success: true,
      message: "Payrolls created successfully",
      data: payrolls,
    });
  } catch (error) {
    console.log("An error occurred while creating payrolls", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating payrolls",
      error: error.message,
    });
  }
};

  

export const getPayroleById = async (req, res) => {
  try {
    const emp_id = req.query.emp_id;
    const payrole = await payroleMaster.findAll({
      where: { emp_id: emp_id },
    });
    if (!payrole) {
      return res.status(404).json({
        success: false,
        message: "Payrole not found",
      })
    }
    return res.status(200).json({
      success: true,
      message: "Payrole fetched successfully", payrole
    })
  } catch (error) {
    console.log("An error occurred while fetching payrole", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching payrole",
      error: error.message,
    });
    }
};  
export const getPayroleMonthById = async (req, res) => {
  try {
    const emp_id = req.query.emp_id;

    // const salary_month = req.query.salary_month;
    const [payrole] = 
    await db.query(`SELECT "id", "emp_id", "emp_name", "salary_month", "BasicSalary", "ProvidentFund", "ConveyanceAllowance", "ESI", "HouseRentAllowance", "ProfessionalTax", "MedicalAllowance", "IncomeTax", "TravelAllowance", "Loan", "OtherDeductions", "PerformancePay", "NightShiftAllowance", "Overtime", "Bonus", "SpecialAllowance", "ctc", "netPay", "createdAt", "updatedAt" 
    FROM "newhrms"."employee_payroles" AS "employee_payrole"
    WHERE "employee_payrole"."emp_id" = '${emp_id}'`);
   
    if (!payrole) {
      return res.status(404).json({
        success: false,
        message: "Payrole not found",
      });
      
    }
    return res.status(200).json(OPERATION_SUCCESS({
      success: true,
      message: "Payrole fetched successfully",
      data: payrole,
    }));
  } catch (error) {
    return res.status(500).json(OPERATION_FAILED({
      success: false,
      message: "An error occurred while fetching payrole",
      error: error.message,
    }));

  }
};



// export const getAllPayslip = async (req, res) => {
//   try {
//     const payrole = await Employee_payrole.findAll();
//     const bank = await Employee_Bank.findAll();
//     const emp = await Employee_details.findAll();

//     if (!payrole || !bank || !emp) {
//       return res.status(404).json({
//         success: false,
//         message: "Data not found",
//       });
//     }

//     // Organize data by employee ID in a single array
//     const dataArray = payrole.map((entry) => {
//       const empId = `${entry.emp_id.toString().padStart(4, '0')}`;
//       const bankEntry = bank.find((bankEntry) => empId === `${bankEntry.emp_detail_id.toString().padStart(4, '0')}`);
//       const empEntry = emp.find((empEntry) => empId === `${empEntry.emp_id.toString().padStart(4, '0')}`);

//       return {
  
//         payrole: entry,
//         bank: bankEntry,
//         emp: empEntry,
//       };
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Payrole fetched successfully",
//       data: dataArray,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching payrole",
//       error: error.message,
//     });
//   }
// };

export const getAllPayslip = async (req, res) => {
  try {
    const payrole = await Employee_payrole.findAll({
      order: [['createdAt', 'DESC']], 
    });
    const bank = await Employee_Bank.findAll();
    const emp = await Employee_details.findAll();

    if (!payrole || !bank || !emp) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    // Organize data by employee ID in a single array
    const dataArray = payrole.map((entry) => {
      const empId = `${entry.emp_id.toString().padStart(4, '0')}`;
      const bankEntry = bank.find((bankEntry) => empId === `${bankEntry.emp_detail_id.toString().padStart(4, '0')}`);
      const empEntry = emp.find((empEntry) => empId === `${empEntry.emp_id.toString().padStart(4, '0')}`);

      return {
        payrole: entry,
        bank: bankEntry,
        emp: empEntry,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Payrole fetched successfully",
      data: dataArray,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching payrole",
      error: error.message,
    });
  }
};




export const updatePayroleCtc = async (req, res) => {
  try {
    const emp_id = req.body.emp_id;
    const ctc = req.body.ctc;
    const otherDeductions = req.body.otherDeductions; // Assuming otherDeductions is part of the request body

    const payrole = await Employee_payrole.update(
      { ctc: ctc, otherDeductions: otherDeductions },
      { where: { emp_id: emp_id } }
    );

    if (payrole[0] === 0) {
      // Check if no rows were affected
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payroll updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating payroll",
      error: error.message,
    });
  }
};


// export const send_slipToManagerssss = async (req, res) => {
//   try {
//     const emp_id = Array.isArray(req.body.emp_id) ? req.body.emp_id : [req.body.emp_id];
//     const manager_id = req.body.manager_id;
//     const send_slip = req.body.send_slip

//     const payroles = await Employee_payrole.update(
//       { send_slip: send_slip },
//       { where: { emp_id: emp_id } }
//     );

//     if (payroles[0] === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Payroles not found for the given emp_ids",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Payroles updated successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while updating payroles",
//       error: error.message,
//     });
//   }
// };




// export const send_slipToManager = async (req, res) => {
//   try {
//     const { emp_id } = req.body; // Assuming you receive an array of emp_ids

//     // Ensure emp_ids is always an array
//     const employeeIds = Array.isArray(emp_id) ? emp_id : [emp_id];

//     // Update the send_slip field to "HOLD" for the specified emp_ids
//     const [affectedRowsCount] = await Employee_payrole.update(
//       { send_slip: "HOLD" },
//       { where: { emp_id: employeeIds } }
//     );
 
//     if (affectedRowsCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Payroles not found for the given emp_ids",
//       });
//     }

//     // Now you can send the payrolls to the manager (implement your logic here)
//     // You can generate PDFs and send emails as shown in the previous examples.

//     return res.status(200).json({
//       success: true,
//       message: "Payroles updated successfully and sent to the manager",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while updating payroles",
//       error: error.message,
//     });
//   }
// };


export const send_slipToManager = async (req, res) => {
  try {
    const emp_ids = req.body.emp_ids; 
    const manager_id = req.body.manager_id;
    const send_slip = req.body.send_slip;
    const salary_month = req.body.salary_month

    const updatedRowsCounts = await Promise.all(
      emp_ids.map(async (emp_id) => {
        const [updatedRowsCount] = await Employee_payrole.update({
          // salary_month: salary_month,
          send_slip: "HOLD" ,
        },
          { where: { emp_id: emp_id } }
        
        );
        return updatedRowsCount;
      })
    );
  
    const totalUpdatedRows = updatedRowsCounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    

    if (totalUpdatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "No payroll records found for the given employee IDs",
      });
    }
    if (send_slip === "PAID" || send_slip === "REJECT") {
      // Send a notification to HR
      try {
        const getemp = await Employee_details.findOne({
          where: { emp_id: emp_ids },
        });
        const notificationMessage = `${getemp.emp_name}'s payroll "${send_slip}" `;

        // Send a notification to HR
        await notificationInsert(
          getemp.email, // Source mail (employee's email)
          manager.email, // Target mail (manager's email)
          notificationMessage,
          payrole.id, // Notification ID (you can use payroll ID)
          "PAYROLL_CREATED" // Notification type
        );
      }
      catch (error) {
        console.log(
          "An error occurred while creating payroll",
        );
        return res.status(500).json(OPERATION_FAILED({
          success: false,
          message: "An error occurred while creating payroll",
          error: error.message,
        }));
      }
    }
    return res.status(200).json({
      success: true,
      message: "Payroll updated successfully",
    });
  } catch (error) {
    return res.status(500).json({

      success: false,
      message: "An error occurred while updating payroll",
      error: error.message,
    });
  }
};


export const DeletePayroles = async(req,res) =>{
  try {
    const emp_id = req.body.emp_id;
    const payrole = await Employee_payrole.destroy({where:{emp_id:emp_id}});
    if (!payrole) {
      return res.status(404).json({
        success: false,
        message: "Payrole not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Payrole deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting payrole",
      error: error.message,
    });
  }
}




export const updatePayroles = async (req, res) => {
  try {
    const { emp_id, salary, bonuses, otherAllowances } = req.body;

    if (!emp_id) {
      Logger.info("emp_id is required", { service: service_module });
      return res.status(400).json({ error: "emp_id is required" });
    }

    try {
      // Calculate the new gross amount
      const newGross = calculateGross(salary, bonuses, otherAllowances);

      // Update the employee payrole with the new values, including the calculated gross
      const updatePayrole = await Employee_payrole.update(
        { salary, bonuses, otherAllowances, gross: newGross },
        { where: { emp_id: emp_id } }
      );

      if (updatePayrole) {
        Logger.info("Employee payrole updated successfully", {
          service: service_module,
        });
        return res.status(200).json(OPERATION_SUCCESS("Employee payrole updated successfully"));
      } else {
        Logger.info("No records updated", { service: service_module });
        return res.status(400).json(OPERATION_FAILED("No records updated"));
      }
    } catch (error) {
      Logger.error(
        "Caught exception in updating employee payrole",
        { service: service_module },
        error
      );

      console.error(error);
      res
        .status(500)
        .json(OPERATION_FAILED("Caught exception in updating employee payrole", error));
    }
  } catch (error) {
    Logger.error(
      "Caught exception in updating employee payrole",
      { service: service_module },
      error
    );
    res
      .status(500)
      .json(OPERATION_FAILED("Caught exception in updating employee payrole", error));
  }
};





   