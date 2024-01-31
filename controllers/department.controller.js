import Departments from "../models/department.model.js";
import Branch from "../models/branch.model.js";

export const createDepartment = async (req, res) => {
     const { branchId, branchName, departmentId, departmentName } = req.body;
     try {
          await Departments.sync({ force: false });
          const branch = await Branch.findOne({ where: { branchId: branchId } });

          if (!branch) {
               return res.status(200).json({
                    message: `Branch with ID ${branchId} not found`,
                    status: 400,
               });
          }

          const existingDepartmentId = await Departments.findOne({ where: { branchId: branchId, departmentId: departmentId } });
          const existingDepartmentName = await Departments.findOne({ where: { branchId: branchId, departmentName: departmentName } });

          if (existingDepartmentId || existingDepartmentName) {
               let errorMessage = '';
               if (existingDepartmentId) errorMessage += `Department ID ${existingDepartmentId.departmentId} already exists. `;
               if (existingDepartmentName) errorMessage += `Department Name ${existingDepartmentName.departmentName} already exists. `;

               return res.status(200).json({
                    message: errorMessage.trim(),
                    status: 400,
                    result: {
                         departmentId: existingDepartmentId ? existingDepartmentId.departmentId : null,
                         departmentName: existingDepartmentName ? existingDepartmentName.departmentName : null,
                    },
               });
          }

          const create = {
               branchId: branch.branchId, branchName: branch.branchName, departmentId, departmentName
          }

          const createdDepartment = await Departments.create(create);

          return res.status(200).json({
               message: 'Department created successfully',
               status: 200,
               result: createdDepartment,
          });

     } catch (error) {
          console.error("Error creating company:", error);
          return res.status(500).json({
               message: 'Internal server error',
               status: 500,
               error: error.message,
          });
     }
};

export const getAllDepartments = async (req, res) => {
     try {
          const allDepartments = await Departments.findAll();
          if (!allDepartments) {
               return res.status(200).json({
                    message: 'No Departments found',
                    status: 400,
               });
          }
          return res.status(200).json({
               message: 'All Departments fetched successfully',
               status: 200,
               result: allDepartments,
          });
     } catch (error) {
          console.error("Error fetching companies:", error);
          return res.status(500).json({
               message: 'Internal server error',
               status: 500,
               error: error.message,
          });
     }
};

export const getDepartmentsByBranchId = async (req, res) => {
     try {
          const { branchId } = req.query;

          const departments = await Departments.findAll({
               where: {
                    branchId: branchId
               }
          });

          if (!departments || departments.length === 0) {
               return res.status(404).json({
                    error: 'No departments found for the specified branchId'
               });
          }

          return res.status(200).json({
               message: 'Departments fetched successfully',
               status: 200,
               result: departments
          });
     } catch (error) {
          return res.status(500).json({
               error: 'Could not fetch departments',
               details: error
          });
     }
};

export const updateDepartment = async (req, res) => {
     const { departmentId, departmentName } = req.body;

     if (!departmentId) {
          return res.status(400).json({ message: "Department Id is required", status: 400 });
     }

     try {
          const [updatedCount] = await Departments.update(
               { departmentName },
               { where: { departmentId } }
          );

          if (updatedCount === 0) {
               return res.status(404).json({
                    message: `Department with ID ${departmentId} not found`,
                    status: 404,
               });
          }

          return res.status(200).json({
               message: `Department updated successfully`,
               status: 200,
          });
     } catch (error) {
          console.error('Error updating department:', error);
          return res.status(500).json({
               message: 'Internal server error',
               status: 500,
               error: error.message,
          });
     }
};

export const deleteDepartment = async (req, res) => {
     const { departmentId } = req.body;

     if (!departmentId) {
          return res.status(400).json({ message: "Department Id is required", status: 400 });
     }

     try {
          const deletedCount = await Departments.destroy({ where: { departmentId } });

          if (deletedCount === 0) {
               return res.status(404).json({
                    message: `Department with ID ${departmentId} not found`,
                    status: 404,
               });
          }

          return res.status(200).json({
               message: `Department deleted successfully`,
               status: 200,
          });
     } catch (error) {
          console.error('Error deleting department:', error);
          return res.status(500).json({
               message: 'Internal server error',
               status: 500,
               error: error.message,
          });
     }
};