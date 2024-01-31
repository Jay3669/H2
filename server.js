import express from 'express';
import bodyParser from 'body-parser';
import db from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import verifyToken from "./functions/verifyJwt.js";
import path from 'path';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = path.resolve()
app.use(cors());

db.authenticate()
  .then(() => {
    console.log("Database connected");
    db.sync();
  })
  .catch((err) => {
    console.log(err);
  });


// Routes init

app.get('/', (req, res) => {
  res.send("Hello World")
})

import employee from "./router/employee.router.js"
app.use("/employee", employee);

import activity from "./router/activity.router.js"
app.use("/activity", activity);

import payrole from "./router/payrole.router.js"
app.use("/payrole", payrole);

import candidateLeave from "./router/candidateLeave.router.js"
app.use("/candidateLeave", candidateLeave);

import Notification_master from './router/notificationMaster.router.js';
app.use("/Notification_master", Notification_master);

import manager from "./router/manager.router.js";
app.use("/manager", manager);

import hr from "./router/hr.router.js";
app.use("/hr", hr);

import tax_slab from "./router/tax_slab.router.js"
app.use("/tax_slab", tax_slab);

import company from "./router/company.router.js"
app.use("/company", company);

import currency from "./router/currency.router.js"
app.use("/currency", currency);

import timesheet from "./router/timesheet.router.js"
app.use("/timesheet", timesheet);

import holidays from "./router/holidays.router.js"
app.use("/holidays", holidays);

import loan from "./router/loan.router.js"
app.use("/loan", loan);

import documentType from "./router/documentType.master.routes.js"
app.use("/documentType", documentType);

import document from "./router/document.master.routes.js"
app.use("/document", document);

import JobDetails from  "./router/jobDetails.router.js"
app.use("/jobDetails", JobDetails);

const port = process.env.PORT || 5200;
app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});






