import db from "../config/db.js";
const service_module = "currency_details";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import Logger from "../config/logger.js";
import currency_details from "../models/currency.model.js";

import express from 'express';
import axios from 'axios';


export const createCurrency = async (req, res) => {
    const { country, currency_name, symbol } = req.body;
    try {
        const checkdata = await currency_details.findOne({
            where: { country: country },
        });
        if (checkdata) {
            return res
                .status(400)
                .json(OPERATION_FAILED("Currency already exists"));
        }
        const currency = {
            country: country,
            currency_name: currency_name,
            symbol: symbol,
        }
        const create_currency = await currency_details.create(currency);
        if (create_currency) {
            return res
                .status(200)
                .json(OPERATION_SUCCESS("Currency created successfully", create_currency));
        }
    } catch (error) {
        
        console.log(error);
        Logger.error(
            "Caught exception in creation of Currency",
            { service: service_module },
            error
        );
        res
            .status(400)
            .json(OPERATION_FAILED("Caught exception in creation of Currency", error));
    }
}


export const getCurrencyByCountry = async (req, res) => {
    try {
        const country = req.query.country;
        const get_currency = await currency_details.findOne({ where: { country: country } });
        if (get_currency) {
            return res
                .status(200)
                .json(OPERATION_SUCCESS("Currency fetched successfully", get_currency));
        }
    } catch (error) {
        console.log(error);
        Logger.error(
            "Caught exception in fetching of Currency",
            { service: service_module },
            error
        );
        res
            .status(400)
            .json(OPERATION_FAILED("Caught exception in fetching of Currency", error));
    }
}


export const getAllCurrency = async (req, res) => {
    try {
        const get_currency = await currency_details.findAll();
        if (get_currency) {
            return res
                .status(200)
                .json(OPERATION_SUCCESS("Currency fetched successfully", get_currency));
        }
    } catch (error) {
        console.log(error);
        Logger.error(
            "Caught exception in fetching of Currency",
            { service: service_module },
            error
        );
        res
            .status(400)
            .json(OPERATION_FAILED("Caught exception in fetching of Currency", error));
    }
}












// export const getCurrency = async (req, res) => {
//     try {
//       const response = await axios.get('https://restcountries.com/v3/all');
//       console.log("response",response)
//       const countries = response.data.map((country) => {
//         const name = country.name.common;
//         const currency = country.currencies && country.currencies[[Object.keys(country.currencies)[0]]];
//         const flag = country.flags;
//         const currencySymbol = currency ? currency.symbol : 'N/A';
//         return {
//           name,
//           currencySymbol,
//           flag,
//         };
//       });
//       res.json(countries);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Unable to fetch data' });
//     }
//   };


  
  
  

