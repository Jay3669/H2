import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
const service_module = "Employee_details";
import Logger from "../config/logger.js";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import db from "../config/db.js";
import path from "path";
import bodyParser from "body-parser";
import Employee_details from "../models/employee.model.js";
import Employee_Bank from "../models/empBank.model.js";
import { where } from "sequelize";
import Sequelize from "sequelize";
import Manager_details from "../models/manager.model.js";
import Hr_details from "../models/hr.model.js";
import Employee_Certificates from "../models/certificates.model.js";
import payroleMaster from "../models/payroleMaster.model.js";
import Employee_payrole from "../models/empPayrole.model.js";
import { Op } from 'sequelize';
import invite_team from "../models/invite.model.js";
import sendInvitationEmail from "../functions/emailInvitation.js"
import { create } from "domain";
import { generateRandomPassword } from "../functions/generatePassword.js";

// export const createEmployee = async (req, res) => {
//   const {
//     emp_id,
//     firstName,
//     lastName,
//     role,
//     phoneno,
//     password,
//     email,
//     aadhar_num,
//     pan_num,
//     DOB,
//     gender,
//     bank_name,
//     bank_branch,
//     account_num,
//     ifsc,
//     account_type,
//     type,
//     pic,
//     marital_status,
//     designation,
//     address,
//     state,
//     city,
//     country,
//     pincode,
//     ctc,
//     BasicSalary,
//     manager_id,
//     hr_id,
//     emp_shift,
//     company
//   } = req.body;
//   console.log(req.body, "==============");
//   // Check if emp_id and email are provided
//   if (!emp_id || !email) {
//     Logger.info("Emp_id and Email are required", { service: service_module });
//     return res.status(400).json({ error: "Emp_id and Email are required" });
//   }
//   //emp_data
//   try {
//     const existingEmployee = await Employee_details.findOne({
//       where: { email: email },
//     });

//     if (existingEmployee) {
//       Logger.info("Employee already exists", {
//         service: service_module,
//       });
//       return res.status(400).json({ error: "Employee already exists" });
//     }

//     const encryptPassword = await bcrypt.hashSync(password, 8);

//     let time = null;
//     if (type === 'full time') {
//       time = 8;
//     }

//     const data = {
//       time: Date(),
//       email: email,
//     };
//     const token = jsonwebtoken.sign(data, process.env.JWT_SECRET_KEY);

//     // Create the employee record in the Employee_details table
//     const create_emp = await Employee_details.create({
//       firstName: firstName,
//       lastName: lastName,
//       emp_name: `${firstName} ${lastName}`,
//       phoneno: phoneno,
//       password: encryptPassword,
//       role: role,
//       accessToken: token,
//       email: email,
//       emp_id: emp_id,
//       aadhar_num: aadhar_num,
//       pan_num: pan_num,
//       DOB: DOB,
//       gender: gender,
//       type: type,
//       pic: pic,
//       marital_status: marital_status,
//       designation: designation,
//       address: address,
//       state: state,
//       city: city,
//       country: country,
//       pincode: pincode,
//       status: "ACTIVE",
//       manager_id: manager_id,
//       hr_id: hr_id,
//       emp_shift: emp_shift,
//       company: company

//     });

//     // Create an object with the bank details
//     const bank_details = {
//       emp_detail_id: create_emp.emp_id,
//       name: create_emp.emp_name,
//       email: create_emp.email,
//       bank_name: bank_name ? bank_name : "",
//       bank_branch: bank_branch ? bank_branch : "",
//       account_num: account_num ? account_num : null,
//       account_type: account_type ? account_type : "",
//       ifsc: ifsc ? ifsc : "",
//     };
//     console.log(bank_details, "========================");

//     // Create the bank details record in the Employee_Bank table
//     const bankDetails = await Employee_Bank.create(bank_details);

//     const payroleDetails = await Employee_payrole.create({
//       emp_id: create_emp.emp_id,
//       emp_name: create_emp.emp_name,
//       emp_pic: create_emp.pic,
//       manager_id: create_emp.manager_id,
//       ctc: ctc,
//       BasicSalary: BasicSalary,
//     });

//     if (create_emp && bankDetails && payroleDetails) {
//       res.status(200).json(
//         OPERATION_SUCCESS("Employee created successfully", {
//           bank: bankDetails,
//           emp: create_emp,
//           payrole: payroleDetails,
//         })
//       );
//     } else {
//       res.status(400).json(OPERATION_FAILED("Employee creation failed"));
//     }
//   } catch (error) {
//     console.log(error);
//     Logger.error(
//       "caught exception in employee creation ",
//       { service: service_module },
//       error
//     );
//     res
//       .status(500)
//       .json(OPERATION_FAILED("caught exception in employee creation", error));
//   }
// };

export const createEmployee = async (req, res) => {
    const {
        emp_id,
        firstName,
        lastName,
        role,
        phoneno,
        password,
        email,
        aadhar_num,
        pan_num,
        voter_card,
        DOB,
        gender,
        bank_name,
        bank_branch,
        account_num,
        ifsc,
        account_type,
        type,
        pic,
        marital_status,
        designation,
        temporary_address,
        permanent_address,
        state,
        city,
        country,
        pincode,
        gross,
        company,
        hr_id,
        manager_id,
        joining_date,
        relieving_date,
        department,
        saveAsDraft
    } = req.body;

    // Check if emp_id and email are provided
    if (!emp_id || !email) {
        Logger.info("Emp_id and Email are required", { service: service_module });
        return res.status(400).json({ error: "Emp_id and Email are required" });
    }

    try {
        const existingEmployeeByEmail = await Employee_details.findOne({
            where: { email: email },
        });

        if (existingEmployeeByEmail) {
            Logger.info("Email already exists", {
                service: service_module,
            });
            return res.status(400).json({ error: "Email already exists" });
        }

        const latestEmployee = await Employee_details.findOne({
            order: [['emp_id', 'DESC']],
        });

        // Generate the next emp_id
        let nextEmpId;
        if (latestEmployee) {
            const currentEmpId = parseInt(latestEmployee.emp_id.slice(3)); // Extract the numeric part
            nextEmpId = `EMP${String(currentEmpId + 1).padStart(4, '0')}`; // Increment and format
        } else {
            nextEmpId = 'EMP0001'; // If no employee exists, start with EMP0001
        }

        // Encrypt the password
        const randomPassword =  generateRandomPassword();
        // Create JWT token

        const data = {
            time: Date(),
            email: email,
        };
        const token = jsonwebtoken.sign(data, process.env.JWT_SECRET_KEY);

        // Fetch manager and HR details
        const managerDetails = await Hr_details.findOne({
            attributes: ["ids", "company"],
            where: { ids: "manager_id", role: "Manager" },
        });

        const hrDetails = await Hr_details.findOne({
            attributes: ["ids", "company"],
            where: { ids: "hr_id", role: "Hr" },
        });

        // Handle temporary and permanent address
        let temporary_address = req.body.temporary_address || [];
        if (!Array.isArray(temporary_address)) {
            temporary_address = [temporary_address];
        }

        let permanent_address = req.body.permanent_address || [];
        if (!Array.isArray(permanent_address)) {
            permanent_address = [permanent_address];
        }

        // Validate age based on DOB
        const today = new Date();
        const birthDate = new Date(DOB);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18 || age >= 60) {
            Logger.info("Invalid DOB. Age should be between 18 and 60 years.", { service: service_module });
            return res.status(400).json({ error: "Invalid DOB. Age should be above 18 and below 60 years." });
        }

// PAN number validation
const panNumRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const pan = pan_num.toUpperCase();

console.log('Original PAN:', pan_num);
console.log('Converted PAN:', pan);

if (!panNumRegex.test(pan)) {
    Logger.info("Invalid PAN number.", { service: service_module });
    return res.status(400).json({ error: "Invalid PAN number." });
}

const joiningDate = new Date(joining_date);
// Check if joining_date is in the future or within the current month
if (joiningDate < today || joiningDate.getMonth() < today.getMonth()) {
    Logger.info("Invalid joining date. Employee Payrole for this month is closed", { service: service_module });
    return res.status(400).json({ error: "Invalid joining date. Employee Payrole for this month is closed" });
}

        // Create the employee record in the Employee_details table
        const create_emp = await Employee_details.create({
            firstName,
            lastName,
            emp_name: `${firstName} ${lastName}`,
            phoneno,
            password: randomPassword, 
            role,
            accessToken: token,
            email,
            emp_id : nextEmpId,
            aadhar_num,
            pan_num: pan,
            voter_card,
            DOB,
            gender,
            type,
            pic,
            marital_status,
            designation,
            temporary_address,
            permanent_address,
            state,
            city,
            country,
            pincode,
            status: "ACTIVE",
            manager_id: managerDetails?.ids,
            hr_id: hrDetails?.ids,
            company,
            joining_date,
            relieving_date,
            department, 
        });

        // Create an object with the bank details
        const bank_details = {
            emp_detail_id: create_emp.emp_id,
            name: create_emp.emp_name,
            email: create_emp.email,
            bank_name: bank_name ? bank_name : "",
            bank_branch: bank_branch ? bank_branch : "",
            account_num: account_num ? account_num : null,
            account_type: account_type ? account_type : "",
            ifsc: ifsc ? ifsc : "",
        };

        const bankDetails = await Employee_Bank.create(bank_details);

        // Calculate ctc and BasicSalary
        const ctc = gross * 12;
        const BasicSalary = 0.5 * gross;
        
        const payrole_details = {
            emp_id: create_emp.emp_id,
            emp_name: create_emp.emp_name,
            emp_pic: create_emp.pic,
            manager_id: create_emp.manager_id,
            gross,
            ctc,
            BasicSalary,
        };

        const payroleDetailsMaster = await payroleMaster.create(payrole_details);
        const payroleDetailsEmployee = await Employee_payrole.create(payrole_details);

        const emailTemplateContext  = {
            company: create_emp.company,
            email: create_emp.email,
            password: create_emp.password, 
            name: create_emp.emp_name,
            invitationLink: 'https://example.com/accept-invitation',  // Replace with the actual link

        };
        let mailOptions = {
            from: 'mallalokesh23@gmail.com',
            to: create_emp.email,
            subject: `Invitation to join '${create_emp.company}`,
            text: `Hello,${create_emp.emp_name} You have been invited to join ${company}. Click the following link to accept the invitation:${token}`,
            // html: `<h1>Hi '${create_emp.emp_name}'</h1><p> Generated password is : '${create_emp.password}'</p>`
            html: `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Employee Invitation</title>
                <style>
            body{
                border: 1px solid green;
                padding: 20px;
                margin: 20px;
            }
            h2{
                color: #9A8B4F;
                font-family:  'Brush Script MT', cursive;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 20px;
            }
            .bg{
                background-image: url('https://i.pinimg.com/736x/36/57/c4/3657c4da1a560f03d4f47544db301913.jpg');
                background-size: 100% 100%; 
                width:500px;
                heigth:auto;
                padding: 20px 10px;
                border-radius: 10px;
                color: black;
                text-align: center;
                font-family: sans-serif;
                font-size: 16px;
                margin: 0 40px;
            }
            .title{
                margin-top:30px;
                padding-top: 5rem;
            }
            </style>
            </head>
            <body>
            <div class="bg">
                <h2 class="title">Invitation to Join '${company}'</h2>
                <p>Hello, <strong>'${create_emp.emp_name}'</strong></p>
                <p>You have been invited to join <strong>'${company}'</strong><p>
                <p>Please find your login details below:</p>
                <p><strong>Email:</strong> '${email}'</p>
                <p><strong>Employee Id:</strong> '${emp_id}'</p>
                <p><strong>Password:</strong> '${create_emp.password}'</p>
                <p>Click the following link to accept the invitation:</p>
                <a href="{{invitationLink}}">Accept Invitation</a>
                <p>Thank you!</p></div>
            </body>
            </html>`,
            context: emailTemplateContext,

        }

        // Respond with success or failure
        if (create_emp && bankDetails && payroleDetailsMaster) {
            await sendInvitationEmail(mailOptions,emailTemplateContext);           
             res.status(200).json(
                OPERATION_SUCCESS("Employee created successfully", {
                    bank: bankDetails,
                    emp: create_emp,
                    payrole: payroleDetailsMaster,
                })
            );
        } else {
            res.status(400).json(OPERATION_FAILED("Employee creation failed"));
        }
    } catch (error) {
        console.log(error);
        Logger.error(
            "Caught exception in employee creation ",
            { service: service_module },
            error
        );
        res
            .status(500)
            .json(OPERATION_FAILED("Caught exception in employee creation", error));
    }
};

export const getEmpByRole = async (req, res) => {
    const { role } = req.query;
    try {
        const emp = await Employee_details.findAll({
            where: {
                role: role,
            },
        });
        return res
            .status(200)
            .json(OPERATION_SUCCESS("retrieved employee by Role", emp));
    } catch (error) {
        Logger.error(
            "caught exception in employee creation ",
            { service: service_module },
            error
        );
        res
            .status(500)
            .json(OPERATION_FAILED("caught exception in employee creation", error));
    }
};

// export const loginEmployeeyyyyyyyyy = async (req, res) => {
//   console.log(req.body, "++++++++++++++++++++++");
//   const { email, password } = req.body;
//   if (!email) {
//     Logger.info("Please enter the email", { service: service_module });
//     return res.status(400).json(OPERATION_FAILED("Please enter the email"));
//   }
//   if (!password) {
//     Logger.info("password is required", { service: service_module });
//     return res.status(400).json(OPERATION_FAILED("password is required"));
//   }
//   try {
//     const checkdata = await Employee_details.findOne({
//       where: { email: req.body.email },
//     });
//     if (!checkdata) {
//       return res
//         .status(400)
//         .json(OPERATION_FAILED("Please enter the valid email"));
//     }
//     const isMatch = await bcrypt.compareSync(password, checkdata.password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json(OPERATION_FAILED("Please enter the valid password"));
//     }
//     res
//       .status(200)
//       .json(OPERATION_SUCCESS("Employee login successfully", checkdata));
//   } catch (error) {
//     console.log(error, "------------------");
//     Logger.error(
//       "caught exeception in  employee login ",
//       { service: service_module },
//       error
//     );
//     res
//       .status(500)
//       .json(OPERATION_FAILED("caught exeception in  employee login", error));
//   }
// };

// export const getEmployeeById = async (req, res) => {
//   const { emp_id } = req.query;
//   try {
//     const employee = await Employee_details.findOne({
//       where: { emp_id },
//       include: [{
//         model: Employee_payrole,
//         where: { emp_id },
//       }],
//     });

//     if (employee) {
//       Logger.info("Employee details were fetched successfully", {
//         service: service_module,
//       });
//       return res.status(200).json(
//         OPERATION_SUCCESS("Employee details were fetched successfully", employee)
//       );
//     } else {
//       Logger.info("No Employee details were found", {
//         service: service_module,
//       });
//       return res.status(200).json(OPERATION_FAILED("No Employee details were found", []));
//     }
//   } catch (error) {
//     console.log(error);
//     Logger.error("Employee fetch failed", { service: service_module }, error);
//     res.status(500).json(OPERATION_FAILED("Employee fetch failed", error));
//   }
// };

export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee_details.findOne({
            where: { emp_id: req.query.emp_id },
        });

        if (employee) {
            const employeeBank = await Employee_Bank.findOne({
                where: { emp_detail_id: employee.emp_id },
            });
            let employeePayrole = {};
            if (employee) {
                employeePayrole = await payroleMaster.findOne({
                    where: { emp_id: employee.emp_id },
                });
            }
            const combinedData = {
                employee_details: employee,
                employee_bank: employeeBank || {}, // Set to an empty object if no Employee_Bank record found
                employee_payrole: employeePayrole || {}, // Set to an empty object if no Employee_payrole record found
            };

            Logger.info("The Employee details were fetched successfully", {
                service: service_module,
            });
            return res
                .status(200)
                .json(
                    OPERATION_SUCCESS(
                        "The Employee details were fetched successfully",
                        combinedData
                    )
                );
        } else {
            Logger.info("No Employee details were found", {
                service: service_module,
            });
            return res
                .status(200)
                .json(OPERATION_FAILED("No Employee details were found", []));
        }
    } catch (error) {
        console.log(error);
        Logger.error("Employee fetch failed", { service: service_module }, error);
        res.status(500).json(OPERATION_FAILED("Employee fetch failed", error));
    }
};

export const getAllEmployee = async (req, res) => {
    try {
        const [emp] = await db.query(`
      SELECT DISTINCT ON (e.emp_id)
        e.emp_id as emp_id, 
        e.emp_name, 
        e.role, 
        e.aadhar_num, 
        e.pan_num, 
        e."DOB", 
        e.email as emp_email, 
        e."temporaryNumber", 
        e."permanentNumber",
        e.type, 
        e.gender, 
        e.pic, 
        e.marital_status, 
        e.designation, 
        e.permanent_address, 
        e.temporary_address,
        e.state, 
        e.city, 
        e.country, 
        e.pincode, 
        e.status, 
        e.company, 
        e.emp_shift,
        b.id as bank_id, 
        b.email as bank_email, 
        b.bank_name, 
        b.bank_branch, 
        b.account_num, 
        b.ifsc, 
        b.account_type, 
        p.ctc, 
        p."BasicSalary"
      FROM 
        newhrms.employee_details as e 
      LEFT JOIN 
        newhrms."Employee_Banks" as b 
      ON 
        e.emp_id = b.emp_detail_id
      LEFT JOIN 
      newhrms."payroleMasters" AS p 
      ON 
        p.emp_id = e.emp_id
    `);

        if (emp && emp.length > 0) {
            Logger.info("The Employee details were fetched successfully", {
                service: service_module,
            });
            res.status(200).json({
                success: true,
                message: "The Employee details were fetched successfully",
                data: emp,
            });
        } else {
            Logger.info("No Employee details were found", {
                service: service_module,
            });
            res.status(404).json({
                success: false,
                message: "No Employee details were found",
            });
        }
    } catch (error) {
        console.error(error);
        Logger.error("Employee fetch failed", { service: service_module }, error);
        res.status(500).json({
            success: false,
            message: "Employee fetch failed",
            error: error.message,
        });
    }
};

export const getAllempBankByID = async (req, res) => {
    try {
        const emp = await Employee_Bank.findOne({
            where: { emp_id: req.query.emp_id },
        });
        if (emp) {
            Logger.info("The Employee details were fetched successfully", {
                service: service_module,
            });
            return res
                .status(200)
                .json(
                    OPERATION_SUCCESS(
                        "The Employee details were fetched successfully",
                        emp
                    )
                );
        } else {
            Logger.info("No Employee details were found", {
                service: service_module,
            });
            return res
                .status(500)
                .json(OPERATION_SUCCESS("No Employee details were found", []));
        }
    } catch (error) {
        Logger.error("Employee fetch failed", { service: service_module }, error);
        res.status(500).json(OPERATION_FAILED("Employee fetch failed", error));
    }
};

export const getEmployeeBystatus = async (req, res) => {
    try {
        const emp = await Employee_details.findAll({
            where: { status: req.query.status },
        });
        if (emp) {
            Logger.info("The Employee details were fetched successfully", {
                service: service_module,
            });
            return res
                .status(200)
                .json(
                    OPERATION_SUCCESS(
                        "The Employee details were fetched successfully",
                        emp
                    )
                );
        } else {
            Logger.info("No Employee details were found", {
                service: service_module,
            });
            return res.status(500);
        }
    } catch (error) {
        Logger.error("Employee fetch failed", { service: service_module }, error);
        res.status(500).json(OPERATION_FAILED("Employee fetch failed", error));
    }
};

export const getbystatusActive = async (req, res) => {
    try {
        const emp = await Employee_details.findAll({ where: { status: "ACTIVE" } });
        if (emp) {
            Logger.info("The Employee details were fetched successfully", {
                service: service_module,
            });
            return res
                .status(200)
                .json(
                    OPERATION_SUCCESS(
                        "The Employee details were fetched successfully",
                        emp
                    )
                );
        } else {
            Logger.info("No Employee details were found", {
                service: service_module,
            });
            return res.status(500);
        }
    } catch (error) {
        Logger.error("Employee fetch failed", { service: service_module }, error);
        res.status(500).json(OPERATION_FAILED("Employee fetch failed", error));
    }
};

export const update_employee = async (req, res) => {
    try {
        const { emp_id } = req.body;

        // Check if emp_id is provided
        if (!emp_id) {
            Logger.info("emp_id is required", { service: service_module });
            return res.status(400).json({ error: "emp_id is required" });
        }

        try {
            // Update employee details within the transaction
            const updateEmpResult = await Employee_details.update(req.body, {
                where: { emp_id },
            });

            // Update employee bank details within the transaction
            const updateEmpBankResult = await Employee_Bank.update(req.body, {
                where: { emp_detail_id: emp_id },
            });

            const updatePayrole = await payroleMaster.update(req.body, {
                where: { emp_id: emp_id },
            });


            if (updateEmpResult && updateEmpBankResult && updatePayrole) {
                Logger.info("Employee updated successfully", {
                    service: service_module,
                });
                return res
                    .status(200)
                    .json(OPERATION_SUCCESS("Employee updated successfully"));
            } else {
                Logger.info("No records updated", { service: service_module });
                return res.status(400).json(OPERATION_FAILED("No records updated"));
            }
        } catch (error) {
            Logger.error(
                "Caught exception in updating Employee",
                { service: service_module },
                error
            );

            console.error(error);
            res
                .status(500)
                .json(OPERATION_FAILED("Caught exception in updating Employee", error));
        }
    } catch (error) {
        Logger.error(
            "Caught exception in updating Employee",
            { service: service_module },
            error
        );
        res
            .status(500)
            .json(OPERATION_FAILED("Caught exception in updating Employee", error));
    }
};

export const loginEmployee = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email) {
            // Handle missing email
            return res.status(400).json(OPERATION_FAILED("Please enter the email"));
        }

        if (!password) {
            // Handle missing password
            return res.status(400).json(OPERATION_FAILED("Password is required"));
        }

        let user = null;

        // Check if the email exists in any of the tables
        const managerUser = await Manager_details.findOne({
            where: { email: email },
        });

        const hrUser = await Hr_details.findOne({
            where: { email: email },
        });

        const employeeUser = await Employee_details.findOne({
            where: { email: email },
        });

        // Check across all tables using Op.or
        const userFromAnyTable = await Manager_details.findOne({
            where: {
                email: email,
            },
        });

        if (!userFromAnyTable) {
            // If not found in Manager_details, check Hr_details
            userFromAnyTable = await Hr_details.findOne({
                where: {
                    email: email,
                },
            });
        }

        if (!userFromAnyTable) {
            // If not found in Hr_details, check Employee_details
            userFromAnyTable = await Employee_details.findOne({
                where: {
                    email: email,
                },
            });
        }

        if (!userFromAnyTable) {
            return res
                .status(400)
                .json(OPERATION_FAILED("Please enter a valid email"));
        }

        const isMatch = await bcrypt.compareSync(password, userFromAnyTable.password);

        if (!isMatch) {
            return res
                .status(400)
                .json(OPERATION_FAILED("Please enter a valid password"));
        }

        res.status(200).json(OPERATION_SUCCESS(`Logged in successfully`, userFromAnyTable));
    } catch (error) {
        console.log(error, "------------------");
        // Handle error cases
        res
            .status(500)
            .json(
                OPERATION_FAILED(`Caught exception in login for email: ${email}`, error)
            );
    }
};
// export const loginEmployee = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email) {
//       Logger.info("Please enter the email", { service: service_module });
//       return res.status(400).json(OPERATION_FAILED("Please enter the email"));
//     }

//     if (!password) {
//       Logger.info("Password is required", { service: service_module });
//       return res.status(400).json(OPERATION_FAILED("Password is required"));
//     }

//     let user = null;

//     // Check if the email exists in any of the tables
//     const managerUser = await Manager_details.findOne({
//       where: { email: email },
//     });

//     const hrUser = await Hr_details.findOne({
//       where: { email: email },
//     });

//     const employeeUser = await Employee_details.findOne({
//       where: { email: email },
//     });

//     if (managerUser) {
//       user = managerUser;
//     } else if (hrUser) {
//       user = hrUser;
//     } else if (employeeUser) {
//       user = employeeUser;
//     } else {
//       return res
//         .status(400)
//         .json(OPERATION_FAILED("Please enter a valid email"));
//     }

//     const isMatch = await bcrypt.compareSync(password, user.password);

//     if (!isMatch) {
//       return res
//         .status(400)
//         .json(OPERATION_FAILED("Please enter a valid password"));
//     }

//     res.status(200).json(OPERATION_SUCCESS(`Logged in successfully`, user));
//   } catch (error) {
//     console.log(error, "------------------");
//     Logger.error(
//       `Caught exception in login for email: ${email}`,
//       { service: service_module },
//       error
//     );
//     res
//       .status(500)
//       .json(
//         OPERATION_FAILED(`Caught exception in login for email: ${email}`, error)
//       );
//   }
// };

export const delete_employee = async (req, res) => {
    try {
        const { emp_id } = req.body;
        if (!emp_id) {
            Logger.info("emp_id is required", { service: service_module });
            return res.status(400).json({ error: "emp_id is required" });
        }
        try {
            const deleteEmp = await Employee_details.destroy({
                where: { emp_id: emp_id },
            });
            const deleteEmpBank = await Employee_Bank.destroy({
                where: { emp_detail_id: emp_id },
            });
            const deleteEmpPayrole = await payroleMaster.destroy({
                where: { emp_id: emp_id },
            });
            if (deleteEmp && deleteEmpBank && deleteEmpPayrole) {
                Logger.info("Employee deleted successfully", {
                    service: service_module,
                });
                return res
                    .status(200)
                    .json(OPERATION_SUCCESS("Employee deleted successfully"));
            } else {
                Logger.info("No records deleted", { service: service_module });
                return res.status(400).json(OPERATION_FAILED("No records deleted"));
            }
        } catch (error) {
            Logger.error(
                "Caught exception in deleting Employee",
                { service: service_module },
                error
            );

            console.error(error);
            res
                .status(500)
                .json(OPERATION_FAILED("Caught exception in deleting Employee", error));
        } 
    } catch (error) {
        Logger.error(
            "Caught exception in deleting Employee",
            { service: service_module },
            error
        );
        res
            .status(500)
            .json(OPERATION_FAILED("Caught exception in deleting Employee", error));
    }
};


export const inviteEmployee = async (req, res) => {
    try {
        const {
            email,
            company,
        } = req.body;

        if (!email) {
            Logger.info("Email is required", { service: service_module });
            return res.status(400).json({ error: "Email is required" });
        }

        const existingEmployee = await Employee_details.findOne({
            where: { email: email },
        });

        if (existingEmployee) {
            Logger.info("Employee with this email already exists", { service: service_module });
            return res.status(400).json({ error: "Employee with this email already exists" });
        }

        const randomPassword = generateRandomPassword();

        const password = randomPassword;

        const tokenData = {
            email,
            time: Date(),
        };
        const token = jsonwebtoken.sign(tokenData, process.env.JWT_SECRET_KEY);

         sendInvitationEmail(email, token, company);

        await invite_team.create({
            email,
            token,
            password,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), 
        });

        res.status(200).json(OPERATION_SUCCESS("Invitation sent successfully"));
    } catch (error) {
        console.error(error);
        Logger.error("Caught exception in invite employee", { service: service_module }, error);
        res.status(500).json(OPERATION_FAILED("Caught exception in invite employee", error));
    }
};



