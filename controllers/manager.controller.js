import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
const service_module = "Manager_details";
import Logger from "../config/logger.js";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import db from "../config/db.js";
import path from "path";
import bodyParser from "body-parser";
import Manager_details from "../models/manager.model.js";
import Hr_details from "../models/hr.model.js";
import company_details from "../models/company.model.js";



// export const createManager = async (req, res) => {
//   const {
//     first_name,
//     last_name,
//     email,
//     role,
//     company,
//     designation,
//     phone,
//     location,
//     about,
//     password,
//   } = req.body;
// console.log(req.body,"==============")
//   // // Check if emp_id and email are provided
//   // if (first_name || !email) {
//   //   Logger.info("first_name and Email are required", { service: service_module });
//   //   return res.status(400).json({ error: "first_name and Email are required" });
//   // }

//   try {
//     // Check if an employee with the provided email already exists
//     const existingManager = await Hr_details.findOne({ where: { email: email } });

//     if (existingManager) {
//       Logger.info("Manager already exists", {
//         service: service_module,
//       });
//       return res.status(400).json({ error: "Manager already exists" });
//     }

//     // Encrypt the password and create a JWT token
//     const encryptPassword = await bcrypt.hashSync(password, 8);
//     const data = {
//       time: Date(),
//       email: email,
//     };
//     const token = jsonwebtoken.sign(data, process.env.JWT_SECRET_KEY);

//     const create_mang = await Hr_details.create({
//       first_name,
//       last_name,
//       email,
//       role,
//       company,
//       designation,
//       phone,
//       location,
//       about,
//       password:encryptPassword,
//     });
//     const create_hr = await Hr_details.create(create_mang);
//     if (create_hr) {
//       const updateOrg = await db.query(`UPDATE newhrms.company_details  SET 
//       manager_ids = array_append(manager_ids,'${create_hr.id}')
//       where company = '${create_hr.company}'`);


//     // console.log('manager created',create_emp,'====================')
//     if (create_mang) {
//       Logger.info("Manager created successfully", { service: service_module });
//       return res
//         .status(200)
//         .json(OPERATION_SUCCESS("Manager created successfully", create_mang));
//     }
//     }
//   } catch (error) {
//     console.log(error);
//     Logger.error(
//       "Caught exception in creation of Manager",
//       { service: service_module },
//       error
//     );
//     res
//       .status(400)
//       .json(OPERATION_FAILED("Caught exception in creation of Manager", error));
//   }
// };

export const createManager = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    role,
    company,
    designation,
    phone,
    location,
    about,
    password,
  } = req.body;

  try {
    // Check if an employee with the provided email already exists
    const existingManager = await Hr_details.findOne({ where: { email: email } });

    if (existingManager) {
      Logger.info("Manager already exists", { service: service_module });
      return res.status(400).json({ error: "Manager already exists" });
    }

    // Encrypt the password and create a JWT token
    const encryptPassword = await bcrypt.hashSync(password, 8);

    // Create the manager
    const createManager = await Hr_details.create({
      first_name,
      last_name,
      email,
      role,
      company,
      designation,
      phone,
      location,
      about,
      password: encryptPassword,
    });

    if (!createManager) {
      Logger.error("Failed to create manager", { service: service_module });
      return res
        .status(500)
        .json(OPERATION_FAILED("Failed to create manager"));
    }

    // Update the manager_ids in the company_details table
    await company_details.update(
      { manager_ids: db.literal(`array_append(manager_ids, '${createManager.id}')`) },
      { where: { company: company } }
    );

    Logger.info("Manager created successfully", { service: service_module });
    return res
      .status(200)
      .json(OPERATION_SUCCESS("Manager created successfully", createManager));
  } catch (error) {
    console.error(error);
    Logger.error(
      "Caught exception in creation of Manager",
      { service: service_module },
      error
    );
    res
      .status(500)
      .json(OPERATION_FAILED("Caught exception in creation of Manager", error));
  }
};

export const getManagerbyId = async(req,res) =>{
  try{
    const manager = await Hr_details.findOne({where:{ids:req.query.ids}})
    if(manager){
      Logger.info("Manager fetched successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Manager fetched successfully", manager));
    }
  }catch(error){
    console.log(error);
    Logger.error(
      "Caught exception in fetching of Manager",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in fetching of Manager", error));
  }
}

export const getAllManager = async(req,res) =>{
  try{
    const manager = await Hr_details.findAll({where:{role:"Manager"}})
    if(manager){
      Logger.info("Manager fetched successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Manager fetched successfully", manager));
    }
  }catch(error){
    console.log(error);
    Logger.error(
      "Caught exception in fetching of Manager",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in fetching of Manager", error));
  }
}


export const getByRole = async(req,res) =>{
  const role = req.query.role
  try{
    const Role_data = await Hr_details.findAll({where:{role:role}})
    if(Role_data){
      Logger.info("Manager fetched successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Manager fetched successfully", Role_data));
    }

  }catch(error){
    console.log(error);
    Logger.error(
      "Caught exception in fetching of Manager",
      { service: service_module },
      error
    );
    res
      .status(400)
      .json(OPERATION_FAILED("Caught exception in fetching of Manager", error));
  }
}
   
   