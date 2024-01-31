import db from "../config/db.js";
const service_module = "TAX_SLAB";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import Logger from "../config/logger.js";
import tax_slab from "../models/tax_slab.model.js";


export const createTaxSlab = async (req, res) => {
    const {
        id, 
        tax_code,
        lower_range,
        higher_range,
        fixed_deduction,
        percentage_deduction,
        taxable_income,
        rates_of_tax,
        year,
    } = req.body;
    try {
        const checkdata = await tax_slab.findOne({
            where: { tax_code: tax_code , year:year,},
        });
        if (checkdata) {
            return res.status(400).json(OPERATION_FAILED("Tax code already exists"));
        }
        const tax = {
            id:id,
            tax_code: tax_code,
            lower_range: lower_range,
            higher_range: higher_range,
            fixed_deduction: fixed_deduction,
            percentage_deduction: percentage_deduction,
            taxable_income: taxable_income,
            rates_of_tax: rates_of_tax,
            year: year,
        };
        const create_tax = await tax_slab.create(tax);
        if (create_tax) {
            return res
                .status(200)
                .json(OPERATION_SUCCESS("Tax slab created successfully", create_tax));
        }
    } catch (error) {
        console.log(error);
        Logger.error(
            "Caught exception in creation of Tax Slab",
            { service: service_module },
            error
        );
        res
            .status(400)
            .json(OPERATION_FAILED("Caught exception in creation of Tax Slab", error));
    }
};


export const getAllTaxSlab = async (req, res) => {
    try {
        const tax = await tax_slab.findAll();
        if (tax) {
            Logger.info("The tax_slab details were fetched successfully", {
              service: service_module,
            });
            return res
              .status(200)
              .json(
                OPERATION_SUCCESS(
                  "The tax_slab details were fetched successfully",
                  tax
                )
              );
          } else {
            Logger.info("No tax_slab details were found", {
              service: service_module,
            });
            return res
              .status(500)
              .json(OPERATION_FAILED("No tax_slab details were found", []));
          }
        } catch (error) {
          console.log(error);
          Logger.error("tax_slab fetch failed", { service: service_module }, error);
          res.status(500).json(OPERATION_FAILED("tax_slab fetch failed", error));
        }
      };

export const getTaxSlabByYear = async (req, res) => {
    const { year } = req.query;
    try {
        const tax = await tax_slab.findAll({
            where: {
                year: year,
            },
        });
        if (tax) {
            return res
                .status(200)
                .json(OPERATION_SUCCESS("Tax slab fetched successfully", tax));
        }
    } catch (error) {
        console.log(error);
        Logger.error(
            "Caught exception in fetching of Tax Slab",
            { service: service_module },
            error
        );
        res
            .status(400)
            .json(OPERATION_FAILED("Caught exception in fetching of Tax Slab", error));
    }
};


export const FilterByYear = async (req, res) => {
    const { year } = req.query;
    try {
        const tax = await tax_slab.findAll({
            where: {
                year: year,
            },
        });
        if (tax) {
            return res
                .status(200)
                .json(OPERATION_SUCCESS("Tax slab fetched successfully", tax));
        }
    } catch (error) {
        console.log(error);
        Logger.error(
            "Caught exception in fetching of Tax Slab",
            { service: service_module },
            error
        );
        res
            .status(400)
            .json(OPERATION_FAILED("Caught exception in fetching of Tax Slab", error));
    }
};