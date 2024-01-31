import Departments from "../models/department.model.js";
import Designations from "../models/designation.model.js";

export const createDesignation = async (req, res) => {
     const { departmentId, departmentName, designationId, designationName } = req.body
     try {
          await Designations.sync({ force: false });
          const existingDepartment = await Departments.findOne({ where: { departmentId: departmentId } });

          if (!existingDepartment) {
               return res.status(200).json({
                    message: `Department with ID ${departmentId} not found`,
                    status: 400,
               });
          }

          const existingDesignationId = await Designations.findOne({ where: { designationId: designationId } });
          const existingDesignationName = await Designations.findOne({ where: { designationName: designationName } });

          if (existingDesignationId || existingDesignationName) {
               let errorMessage = '';
               if (existingDesignationId) errorMessage += `Designation ID ${existingDesignationId.designationId} already exists. `;
               if (existingDesignationName) errorMessage += `Designation Name ${existingDesignationName.designationName} already exists. `;

               return res.status(200).json({
                    message: errorMessage.trim(),
                    status: 400,
                    result: {
                         departmentId: existingDesignationId ? existingDesignationId.designationId : null,
                         departmentName: existingDesignationName ? existingDesignationName.designationName : null,
                    },
               });
          }

          const create = { departmentId, departmentName, designationId, designationName }

          const createdDesignation = await Designations.create(create);

          return res.status(200).json({
               message: 'Designation created successfully',
               status: 200,
               result: createdDesignation,
          });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

export const getAllDesignations = async (req, res) => {
     try {
          const designations = await Designations.findAll();
          res.status(200).json(designations);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

export const getDesignationById = async (req, res) => {
     const id = req.params.id;
     try {
          const designation = await Designations.findByPk(id);
          if (!designation) {
               res.status(404).json({ error: 'Designation not found' });
          } else {
               res.status(200).json(designation);
          }
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

export const updateDesignation = async (req, res) => {
     const id = req.params.id;
     try {
          const [updated] = await Designations.update(req.body, { where: { id } });
          if (updated) {
               const updatedDesignation = await Designations.findByPk(id);
               res.status(200).json(updatedDesignation);
          } else {
               res.status(404).json({ error: 'Designation not found' });
          }
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

export const deleteDesignation = async (req, res) => {
     const id = req.params.id;
     try {
          const deleted = await Designations.destroy({ where: { id } });
          if (deleted) {
               res.status(204).end();
          } else {
               res.status(404).json({ error: 'Designation not found' });
          }
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};
