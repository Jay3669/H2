import db from "../config/db.js";
import Employee_Loans from "../models/loan.model.js";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";

export const createLoan = async (req, res) => {
    const {
        emp_id,
        loanAmount,
        loanAmountPerMonth,
        loanPeriod,
        loanDescription,
        status,
    } = req.body;
    try {
        const checkLoan = await Employee_Loans.findOne({
            where: { emp_id: emp_id },
        });
        if (checkLoan) {
            return res.status(400).json(OPERATION_FAILED("Loan already taken"));
        }
        const loan = {
            emp_id: emp_id,
            loanAmount: loanAmount,
            loanAmountPerMonth: loanAmountPerMonth,
            loanPeriod: loanPeriod,
            loanDescription: loanDescription,
            status: status,
        };
        const create_Loan = await Employee_Loans.create(loan);
        if (create_Loan) {
            return res
                .status(200)
                .json(OPERATION_SUCCESS("Loan applied successfully", create_Loan));
        }
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json(OPERATION_FAILED("Exception caught while creating the loan", error));
    }
};

export const get_All_Loans_By_Id = async (req, res) => {
    try {
        const employeeId = await Employee_Loans.findOne({
            where: { emp_id: req.query.emp_id },
        });

        if (employeeId) {
            return res.status(200).json(
                OPERATION_SUCCESS(
                    "Employee Loans fletched successfully", employeeId
                )
            );
        } else {
            return res.status(200).json(OPERATION_FAILED("No loan details found", []));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(OPERATION_FAILED("Employee loans fetch failed", error));
    }
};
