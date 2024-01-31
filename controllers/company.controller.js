import db from "../config/db.js";
const service_module = "COMPANY_DETAILS";
import { OPERATION_SUCCESS, OPERATION_FAILED } from "../functions/response.js";
import Logger from "../config/logger.js";
import company_details from "../models/company.model.js";
import Manager_details from "../models/manager.model.js";
import Hr_details from "../models/hr.model.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import Employee_details from "../models/employee.model.js";




// export const createCompany = async(req,res) =>{
//         const { first_name, last_name, email, company, password } = req.body;
//         if (!first_name || !last_name || !email || !company || !password) {
//           Logger.error("Fields are missing", { service: service_module });
//           return res.status(400).json(OPERATION_FAILED("Fields are missing"));
//         }
//         try {
//           // Check if the admin or The company user ID already exists
//           const checkAdmin = await Manager_details.findAll({
//             where: { email: email },
//           });
//           const checkOrg = await company_details.findAll({
//             where: { company: company },
//           });
//           if (checkAdmin.length || checkOrg.length) {
//             Logger.info("The company user ID already exists", {
//               service: service_module,
//             });
//             return res
//               .status(400)
//               .json(OPERATION_FAILED("The company user ID already exists"));
//           }
      
//           // Encrypt the password
//           const encryptPassword = await bcrypt.hashSync(password, 8);
//           console.log(encryptPassword, "encryptPassword");
      
//           // Generate access token
//           const token = jsonwebtoken.sign(
//             { time: Date(), userId: 12 },
//             process.env.JWT_SECRET_KEY
//           );
//           // Create admin
//           const role = "ADMIN";
//           const admin = { 
//             manager_name: `${first_name} ${last_name}`,
//             email,
//             company,
//             role: role,
//             accessToken: token,
//             encrypted_password: encryptPassword,
//             is_secured: true,
//             hr_ids
//           };
//           const create_admin = await Manager_details.create(admin);
//           console.log(create_admin, "create_admin");
//           // Create company
//           const org = {
//             company,
//             manager_ids: [create_admin.id],
//             hr_ids: [hrs.id],
//             email: create_admin.email,
//             encrypted_password: encryptPassword,
//           };
//           const createcompany = await company_details.create(org);
//           console.log(createcompany, "createcompany");
  
//           return res
//             .status(200)
//             .json(OPERATION_SUCCESS("Company created successfully",createcompany));
//         } catch (error) {
//           console.log(error);
//           Logger.error("Failed to create company", { service: service_module });
//           return res
//             .status(400)
//             .json(OPERATION_FAILED("Failed to create company", error));
//         }
//       };
                



// export const createCompany = async (req, res) => {
//   const { first_name, last_name, email, company, password } = req.body;
//   if (!first_name || !last_name || !email || !company || !password) {
//     Logger.error("Fields are missing", { service: service_module });
//     return res.status(400).json(OPERATION_FAILED("Fields are missing"));
//   }
//   try {
//     const checkAdmin = await Manager_details.findAll({
//       where: { email: email },
//     });
//     const checkOrg = await company_details.findAll({
//       where: { company: company },
//     });
//     if (checkAdmin.length || checkOrg.length) {
//       Logger.info("The company user ID already exists", {
//         service: service_module,
//       });
//       return res
//         .status(400)
//         .json(OPERATION_FAILED("The company user ID already exists"));
//     }

//     const hrDetails = await Hr_details.findAll({
//       attributes: ['id'],
//       where: { company: company },
//     });

//     // Extract hr_ids from the result
//     const hr_ids = hrDetails.map((hr) => hr.id);

//     // Encrypt the password
//     const encryptPassword = await bcrypt.hashSync(password, 8);

//     // Generate access token
//     const token = jsonwebtoken.sign(
//       { time: Date(), userId: 12 },
//       process.env.JWT_SECRET_KEY
//     );
//     // Create admin
//     const role = "ADMIN";
//     const admin = {
//       manager_name: `${first_name} ${last_name}`,
//       email,
//       company,
//       role: role,
//       accessToken: token,
//       encrypted_password: password,
//       is_secured: true,
//       hr_ids: hr_ids, 
//     };
//     const create_admin = await Manager_details.create(admin);
//     console.log(create_admin,"addddddd==========================================minnnnn")
//     const org = {
//       company,
//       manager_ids: [create_admin.id],
//       hr_ids: hr_ids, 
//       email: create_admin.email,
//       encrypted_password: encryptPassword,
//     };
//     const createcompany = await company_details.create(org);

//     return res
//       .status(200)
//       .json(OPERATION_SUCCESS("Company created successfully", createcompany));
//   } catch (error) {
//     console.log(error);
//     Logger.error("Failed to create company", { service: service_module });
//     return res
//       .status(400)
//       .json(OPERATION_FAILED("Failed to create company", error));
//   }
// };

// export const createCompany = async (req, res) => {
//   const { first_name, last_name, email, company, password } = req.body;

//   if (!first_name || !last_name || !email || !company || !password) {
//     Logger.error("Fields are missing", { service: service_module });
//     return res.status(400).json(OPERATION_FAILED("Fields are missing"));
//   }

//   try {
//     const checkAdmin = await Manager_details.findAll({
//       where: { email: email },
//     });
//     const checkOrg = await company_details.findAll({
//       where: { company: company },
//     });
//     if (checkAdmin.length || checkOrg.length) {
//       Logger.info("The company user ID already exists", {
//         service: service_module,
//       });
//       return res
//         .status(400)
//         .json(OPERATION_FAILED("The company user ID already exists"));
//     }

//     // Create the company first
//     const createcompany = await company_details.create({
//       company,
//     });

//     // Find HR details for the given company
//     const hrDetails = await Hr_details.findAll({
//       attributes: ['id'],
//       where: { company: company },
//     });

//     // Extract hr_ids from the result
//     const hr_ids = hrDetails.map((company) => company.id);

//     // Encrypt the password
//     const encryptPassword = await bcrypt.hashSync(password, 8);

//     // Generate access token
//     const token = jsonwebtoken.sign(
//       { time: Date(), userId: 12 },
//       process.env.JWT_SECRET_KEY
//     );

//     // Create admin
//     const role = "ADMIN";
//     const admin = {
//       manager_name: `${first_name} ${last_name}`,
//       email,
//       company,
//       role: role,
//       accessToken: token,
//       encrypted_password: password,
//       is_secured: true,
//       hr_ids: hr_ids,
//     };
//     const create_admin = await Manager_details.create(admin);
//     console.log(create_admin, "Admin created successfully");

//     // Update the company to include manager_ids and hr_ids
//     createcompany.manager_ids = [create_admin.id];
//     createcompany.hr_ids = hr_ids;
//     createcompany.email = create_admin.email;
//     createcompany.encrypted_password = encryptPassword;

//     // Save the updated company
//     await createcompany.save();

//     return res
//       .status(200)
//       .json(OPERATION_SUCCESS("Company created successfully", createcompany));
//   } catch (error) {
//     console.log(error);
//     Logger.error("Failed to create company", { service: service_module });
//     return res
//       .status(400)
//       .json(OPERATION_FAILED("Failed to create company", error));
//   }
// };


export const createCompany = async (req, res) => {
  const { first_name, last_name, email, company, password } = req.body;

  if (!first_name || !last_name || !email || !company || !password) {
    Logger.error("Fields are missing", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Fields are missing"));
  }

  try {
    const checkAdmin = await Hr_details.findAll({
      where: { email: email },
    });
    const checkOrg = await company_details.findAll({
      where: { company: company },
    });

    // Check if the company already exists
    if (checkOrg.length) {
      // Find HR details for the given company
      const hrDetails = await Hr_details.findAll({
        attributes: ['id','role'],
        where: { company: company },
      });

      // Extract hr_ids from the result
      const hr_ids = hrDetails.map((company) => company.id);

      // Update the HR IDs in the existing company
      await company_details.update(
        { hr_ids: hr_ids }, 
        { where: { company: company } }
      );

      return res.status(200).json(OPERATION_SUCCESS("HR IDs updated successfully"));
    }

    if (checkAdmin.length) {
      Logger.info("The company user ID already exists", {
        service: service_module,
      });
      return res
        .status(400)
        .json(OPERATION_FAILED("The company user ID already exists"));
    }

    const createcompany = await company_details.create({
      company,
    });

    const hrDetails = await Hr_details.findAll({
      attributes: ['id'],
      where: { company: company },
    });

    const hr_ids = hrDetails.map((company) => company.id);

    // Encrypt the password
    const encryptPassword = await bcrypt.hashSync(password, 8);
    

    // Generate access token
    const token = jsonwebtoken.sign(
      { time: Date(), userId: 12 },
      process.env.JWT_SECRET_KEY
    );

    // Create admin
    const role = "Admin";
    const admin = {
    first_name ,
    last_name,
      email,
      company,
      role: role,
      accessToken: token,
      password: encryptPassword,
      is_secured: true,
      hr_ids: hr_ids,
    };
    const create_admin = await Hr_details.create(admin);

    // Update the company to include manager_ids and hr_ids
    createcompany.manager_ids = [create_admin.ids];
    createcompany.hr_ids = hr_ids;
    createcompany.email = create_admin.email;
    createcompany.encrypted_password = create_admin.password;

    // Save the updated company
    await createcompany.save();

    return res
      .status(200)
      .json(OPERATION_SUCCESS("Company created successfully", createcompany));
  } catch (error) {
    Logger.error("Failed to create company", { service: service_module });
    return res
      .status(400)
      .json(OPERATION_FAILED("Failed to create company", error));
  }
};


export const company_login =async(req,res) =>{
  const { email, password } = req.body;
  if (!email || !password) {
    Logger.error("Fields are missing", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Fields are missing"));
  }
  try {
    const company = await company_details.findOne({
      where: { email: email },
    });
    if (!company) {
      Logger.info("Company not found", { service: service_module });
      return res.status(400).json(OPERATION_FAILED("Company not found"));
    }
    const passwordIsValid = bcrypt.compareSync(
      password,
      company.encrypted_password
    );
    if (!passwordIsValid) {
      Logger.info("Invalid password", { service: service_module });
      return res.status(400).json(OPERATION_FAILED("Invalid password"));
    }
    const token = jsonwebtoken.sign(
      { time: Date(), userId: company.id },
      process.env.JWT_SECRET_KEY
    );
    const updateToken = await db.query(
      `UPDATE newhrms.company_details SET accessToken = '${token}' WHERE email = '${email}'`
    );
    if (updateToken) {
      Logger.info("Company logged in successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Company logged in successfully", company));
    }
  } catch (error) {
    Logger.error("Failed to login", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Failed to login", error));
  }
}

export const getAllCompany =async(req,res) =>{
  try {
    const company = await company_details.findAll();
    if (!company) {
      Logger.info("Company not found", { service: service_module });
      return res.status(400).json(OPERATION_FAILED("Company not found"));
    }
    return res
        .status(200)
        .json(OPERATION_SUCCESS("Company logged in successfully", company));
  } catch (error) {
    Logger.error("Failed to login", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Failed to login", error));
  }
}

export const update_company = async (req, res) => {
  const { company } = req.body;
  if (!company) {
    Logger.error("Company not found", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Company not found"));
  }

  try {
    const [count, [updatedCompany]] = await company_details.update(req.body, {
      where: { company },
    });

    if (count > 0) {
      Logger.info("Company updated successfully", { service: service_module });
      return res
        .status(200)
        .json(OPERATION_SUCCESS("Company updated successfully", updatedCompany));
    } else {
      Logger.info("Company not found", { service: service_module });
      return res.status(404).json(OPERATION_FAILED("Company not found"));
    }
  } catch (error) {
    Logger.error("Failed to update company", { service: service_module });
    return res
      .status(500)
      .json(OPERATION_FAILED("Failed to update company", error));
  }
};


export const inviteTeam = async (req, res) => {
  // Destructure data from the request body
  const { admin_email, company, team } = req.body;

  // Check if required fields are missing
  if (!admin_email || !company || !team.length) {
    Logger.info("Fields are missing", { service: service_module });
    return res.status(400).json(OPERATION_FAILED("Fields are missing"));
  }

  // Find admin data from the Hr_details table
  const admin_data = await Hr_details.findOne({
    attributes: ["first_name", "last_name"],
    where: { company: company, email: admin_email },
  });

  // Find admin manager name
  const admin_manager_name = await Manager_details.findOne({
    attributes: ["manager_name"],
    where: { company: company ,email: admin_email },
  });

  try {
    const hrData = team.map((item) => {
      const obj = {};
      obj.first_name = item.name;
      obj.email = item.email;
      obj.role = item.role;
      obj.admin_email = admin_email;
      obj.company = company;
      return obj;
    });
    
   
    // Find existing HRs and candidate emails from the database
    const findHrs = await Hr_details.findAll({
      where: { email: hrData.map((hr) => hr.email) },
    });
    const foundEmails = new Set(findHrs.map((hr) => hr.email));

    const findemployees = await Employee_details.findAll({
      where: {
        email: hrData.map((hr) => hr.email),
        company: hrData.map((hr) => hr.company),
      },
    });
    const foundEmployeeEmails = new Set(
      findemployees.map((emp) => emp.email)
    );

    // Filter out HR data objects that already exist in the database
    const newHrs = hrData.filter(
      (hr) => !foundEmails.has(hr.email) && !foundEmployeeEmails.has(hr.email)
    );

    if (newHrs.length > 0) {
      let data = {
        time: Date(),
        userId: 12,
      };

      const token = jsonwebtoken.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: expiresInSeconds,
      });

      // Create new HRs in the database if there are any
      const createdHrs = await Hr_details.bulkCreate(
        newHrs.map((hr) => ({ ...hr, accessToken: token }))
      );

      // Create new Managers in the database if there are any
      const createdManagers = await Manager_details.bulkCreate(
        newHrs.map((hr) => ({
          manager_name: hr.first_name,
          email: hr.email,
          company: company,
          // Add other manager details as needed
        }))
      );

      // Get manager IDs
      const managerIds = createdManagers.map((manager) => manager.id);

      // Update the company to include manager_ids and hr_ids
      await db.query(
        `UPDATE hr.lob_companys SET hr_ids = array_cat(hr_ids,'{${createdHrs
          .map((hr) => hr.id)
          .join(",")}}'), manager_ids = array_cat(manager_ids, '{${managerIds
          .join(",")}}') WHERE company ='${company}'`
      );

      // Send verification emails to newly created HRs
      createdHrs.forEach(async (hr) => {
        let now = new Date();

        // Get the system's current timezone
        const localTimezone = moment.tz.guess();

        // Convert to local time
        const todayDates = moment.utc(now).tz(localTimezone).format('YYYY-MM-DD HH:mm:ss');
        const sendInviteEmail = await HrVerificationEmail({
          toName: hr.first_name,
          toEmail: hr.email,
          adminName: admin_data.first_name,
          managerName: admin_manager_name.manager_name,
          company: company,
          role: hr.role,
          date: todayDates,
        });
      });
    }

    // Filter HR data objects that already exist in the database and combine them with candidate data objects
    const existingHrs = hrData.filter((hr) => foundEmails.has(hr.email));
    const existingCandidates = hrData.filter(
      (hr) => foundEmployeeEmails.has(hr.email) && !foundEmails.has(hr.email)
    );
    const exists = existingHrs
      .concat(existingCandidates)
      .map((hr) => hr.first_name);

    Logger.info("The company user was invited successfully", {
      service: service_module,
    });

    return res
      .status(200)
      .json(
        OPERATION_SUCCESS("The company user was invited successfully", exists)
      );
  } catch (error) {
    console.log(error);
    Logger.error(
      "Caught exception in HR creation",
      { service: service_module },
      error
    );
    res
      .status(500)
      .json(OPERATION_FAILED("Caught exception in HR creation", error));
  }
};

