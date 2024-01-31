import db from '../config/db.js';
import Bank_Info from '../models/bankInfo.model.js'
import Basic_Info from '../models/basicInfo.model.js';
import Documents_Info from '../models/documentsInfo.model.js';
import Job_Info from '../models/jobInfo.model.js';
import Statutory_Info from '../models/statutoryInfo.model.js';
import Payroll_Info from '../models/payrollInfo.model.js';
import { generateUniqueId } from '../functions/generateUniqueId.js';
import { generatePassword } from '../functions/randomPassword.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userRegister = async (req, res) => {
     const uniqueId = generateUniqueId();

     try {
          const { applicationNo, userId, role, firstName, middleName, lastName, userName, dob, gender, maritalStatus, mobileNumber, personalEmail, email, password, profilePic, permanent_address_line_1, permanent_address_line_2, permanent_city, permanent_state, permanent_country, permanent_zip_code, residential_address_line_1, residential_address_line_2, residential_city, residential_stat, residential_country, residential_zip_code, nameAsInTheAccount, bankName, bankBranch, accountNumber, ifsc, accountType, resume, identityProofs, educationCertificates, experienceCertificates, jobTitle, jobDescription, joiningDate, relievingDate, employeeType, employeeShift, companyName, branchName, department, designation, reportingToId, reportingTo, assetsProvidedTo, aadharNumber, panNumber, uanNumber, pfNumber, esiNumber, voterId, ctc, grossSalary, basicSalary, netPay, houseRentAllowance, conveyanceAllowance, specialAllowance, overtimeAllowance, medicalAllowance, otherAllowances, dearnessAllowance, entertainmentAllowance, transportAllowance, leaveTravelAllowance, bonus, otherTaxableAllowances, uniformAllowance, compensatoryAllowances, sumptuaryAllowance, helperAllowance, otherTaxFreeAllowances, providentFund, professionalTax, labourWelfareFund, loan, esi, incomeTax, otherDeductions, variablePay, PR_Value, HRA_Value, PF_Value, ESI_Value, paymentMode } = req.body;

          const [existingUser, existingEmail] = await Promise.all([
               Basic_Info.findOne({ where: { userId } }),
               Basic_Info.findOne({ where: { email } })
          ]);

          if (existingUser || existingEmail) {
               return res.status(200).json({
                    message: existingUser ? `User ID ${existingUser.userId} already exists` : `Email ${existingEmail.email} already exists`,
                    status: 400,
                    result: existingUser ? "userId" : "email"
               });
          }

          const filteredNameComponents = [firstName, middleName, lastName].filter(Boolean);
          const name = filteredNameComponents.join(' ');

          const autoPassword = generatePassword();

          // const hashedPassword = await bcrypt.hash(password, 10);

          const token = jwt.sign({ time: Date(), email }, process.env.JWT_SECRET_KEY);

          await db.transaction(async (trx) => {
               await Basic_Info.create({ _id: uniqueId, applicationNo, userId, role, firstName, middleName, lastName, userName: name, dob, gender, maritalStatus, mobileNumber, personalEmail, email, password: autoPassword, profilePic, permanent_address_line_1, permanent_address_line_2, permanent_city, permanent_state, permanent_country, permanent_zip_code, residential_address_line_1, residential_address_line_2, residential_city, residential_stat, residential_country, residential_zip_code, status: 'ACTIVE', accessToken: token }, { transaction: trx });

               await Bank_Info.create({ _id: uniqueId, nameAsInTheAccount, bankName, bankBranch, accountNumber, ifsc, accountType }, { transaction: trx });

               await Documents_Info.create({ _id: uniqueId, resume, identityProofs, educationCertificates, experienceCertificates }, { transaction: trx });

               await Job_Info.create({ _id: uniqueId, jobTitle, jobDescription, joiningDate, relievingDate, employeeType, employeeShift, companyName, branchName, department, designation, reportingToId, reportingTo, assetsProvidedTo }, { transaction: trx });

               await Statutory_Info.create({ _id: uniqueId, aadharNumber, panNumber, uanNumber, pfNumber, esiNumber, voterId }, { transaction: trx });

               await Payroll_Info.create({ _id: uniqueId, ctc, grossSalary, basicSalary, netPay, houseRentAllowance, conveyanceAllowance, specialAllowance, overtimeAllowance, medicalAllowance, otherAllowances, dearnessAllowance, entertainmentAllowance, transportAllowance, leaveTravelAllowance, bonus, otherTaxableAllowances, uniformAllowance, compensatoryAllowances, sumptuaryAllowance, helperAllowance, otherTaxFreeAllowances, providentFund, professionalTax, labourWelfareFund, loan, esi, incomeTax, otherDeductions, variablePay, PR_Value, HRA_Value, PF_Value, ESI_Value, paymentMode }, { transaction: trx });
          });

          res.status(200).json({ message: "User registered successfully" });
     } catch (error) {
          console.error("Error occurred during registration:", error);
          res.status(500).json({ error: "Failed to register user" });
     }
};

export const userLogin = async (req, res) => {
     const { email, password } = req.body;

     try {
          const user = await Basic_Info.findOne({ where: { email } });

          if (!user) {
               return res.status(404).json({ message: "User not found" });
          }

          // const passwordMatch = await bcrypt.compare(password, user.password);

          // if (!passwordMatch) {
          //      return res.status(200).json({ message: "Invalid password", status: 401 });
          // }

          if (password !== user.password) {
               return res.status(401).json({ message: "Incorrect password" });
          }

          const token = jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

          res.status(200).json({
               message: "Login successful",
               status: 200,
               result: user
          });
     } catch (error) {
          console.error("Error occurred during login:", error);
          res.status(500).json({ error: "Failed to login" });
     }
};

export const deleteUser = async (req, res) => {
     const { _id } = req.body;

     try {
          await db.transaction(async (trx) => {
               await Promise.all([
                    Basic_Info.destroy({ where: { _id: _id }, transaction: trx }),
                    Bank_Info.destroy({ where: { _id: _id }, transaction: trx }),
                    Documents_Info.destroy({ where: { _id: _id }, transaction: trx }),
                    Job_Info.destroy({ where: { _id: _id }, transaction: trx }),
                    Statutory_Info.destroy({ where: { _id: _id }, transaction: trx }),
                    Payroll_Info.destroy({ where: { _id: _id }, transaction: trx })
               ]);
          });

          res.status(200).json({ message: "User and associated data deleted successfully" });
     } catch (error) {
          console.error("Error occurred during deletion:", error);
          res.status(500).json({ error: "Failed to delete user and associated data" });
     }
};

export const getAllUsers = async (req, res) => {
     try {
          const allUsers = await Basic_Info.findAll();
          const usersWithDetails = await Promise.all(
               allUsers.map(async (userDetails) => {
                    const { _id } = userDetails;
                    const payrollDetails = await Payroll_Info.findOne({ where: { _id } });
                    const bankDetails = await Bank_Info.findOne({ where: { _id } });
                    const documentDetails = await Documents_Info.findOne({ where: { _id } });
                    const jobDetails = await Job_Info.findOne({ where: { _id } });
                    const statutoryDetails = await Statutory_Info.findAll({ where: { _id } });
                    return {
                         userDetails,
                         payrollDetails,
                         bankDetails,
                         jobDetails,
                         statutoryDetails,
                         documentDetails,
                    };
               })
          );

          return res.status(200).json({ message: 'Successfully fletched all users', status: 200, result: usersWithDetails });
     } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error fetching users with details', message: error.message });
     }
};

export const calculatePayroll = async (req, res) => {
     try {
          const { grossSalary } = req.body;
          const basic = 0.5 * grossSalary;

          const calculatedHRA = basic * 0.5;

          res.status(200).json({ 
               message: 'Basic salary calculated successfully', 
               status: 200, 
               basicSalary: basic,
               HRA: calculatedHRA
          });
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to calculate basic salary', message: error.message });
     }
}