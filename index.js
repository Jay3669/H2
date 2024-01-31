import express from 'express';
import bodyParser from 'body-parser';
import db from './config/db.js';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5200;
const __dirname = path.resolve();

db.authenticate().then(() => db.sync()).then(() => {
     app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}).catch(console.error);

import userRouter from "./routers/user.router.js";
app.use("/api/User", userRouter);

import companyRouter from "./routers/company.router.js";
app.use("/api/Company", companyRouter);

import branchRouter from "./routers/branch.router.js";
app.use("/api/Branch", branchRouter);

import departmentRouter from "./routers/department.router.js";
app.use("/api/Department", departmentRouter);

import designationRouter from "./routers/designation.router.js";
app.use("/api/Designation", designationRouter);