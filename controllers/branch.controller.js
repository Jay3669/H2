import Company from "../models/company.model.js";
import Branch from "../models/branch.model.js";

export const createBranch = async (req, res) => {
     const { companyId, ...branchData } = req.body;

     try {
          await Branch.sync({ force: false });
          const company = await Company.findByPk(companyId);

          if (!company) {
               return res.status(400).json({
                    message: `Company with ID ${companyId} not found`,
                    status: 400,
               });
          }

          const [existingBranchId, existingEmail] = await Promise.all([
               Branch.findOne({ where: { branchId: branchData.branchId } }),
               Branch.findOne({ where: { email: branchData.email } }),
          ]);

          if (existingBranchId || existingEmail) {
               const errorMessage = `${existingBranchId ? `Branch ID ${existingBranchId.branchId} already exists. ` : ''}${existingEmail ? `Email ${existingEmail.email} already exists. ` : ''}`;

               return res.status(400).json({
                    message: errorMessage.trim(),
                    status: 400,
                    result: {
                         branchId: existingBranchId ? existingBranchId.branchId : null,
                         email: existingEmail ? existingEmail.email : null,
                    },
               });
          }

          const branchLocation = branchData.address[0]?.city;

          const createdBranch = await Branch.create({
               companyId: company.id,
               companyName: company.companyName,
               logo: company.companyLogo,
               ...branchData,
               branchLocation,
          });

          return res.status(200).json({
               message: 'Branch created successfully',
               status: 200,
               result: createdBranch,
          });
     } catch (error) {
          console.error("Error creating branch:", error);
          return res.status(500).json({
               message: 'Internal server error',
               status: 500,
               error: error.message,
          });
     }
};

export const getAllBranches = async (req, res) => {
     try {
          const branches = await Branch.findAll();

          const response = branches.length
               ? { message: 'All Branches fetched successfully', status: 200, result: branches }
               : { message: 'No branches found', status: 400 };

          return res.status(response.status).json(response);
     } catch (error) {
          console.error('Error fetching branches:', error);
          return res.status(500).json({ message: 'Internal server error', status: 500, error: error.message });
     }
};

export const getAllBranchesByCompanyName = async (req, res) => {
     try {
          const { companyName } = req.query;

          const branches = await Branch.findAll({ where: { companyName } });

          const response = branches.length
               ? { message: 'Branches retrieved successfully', status: 200, result: branches }
               : { message: 'No branches found for the given company name', status: 404 };

          return res.status(response.status).json(response);
     } catch (error) {
          console.error('Error fetching branches:', error);
          return res.status(500).json({ message: 'Internal server error', status: 500, error: error.message });
     }
};

export const updateBranch = async (req, res) => {
     const { branchId } = req.body;
     if (!branchId) return res.status(200).json({ message: "Branch Id is required", status: 400 });

     try {
          const updatedBranchDetails = await Branch.update(req.body, { where: { branchId } });
          return res.status(200).json({ message: `Branch Details updated successfully`, status: 200 });
     } catch (error) {
          return res.status(500).json({ message: "Failed to update Project details", message: error.message });
     }
};

export const deleteBranch = async (req, res) => {
     const { branchId } = req.body;

     try {
          const deletedCount = await Branch.destroy({ where: { branchId } });

          const response = deletedCount === 0
               ? { message: `Branch ${deletedCount.branchName} not found`, status: 404 }
               : { message: `Branch ${deletedCount.branchName} deleted successfully`, status: 200 };

          return res.status(response.status).json(response);
     } catch (error) {
          console.error('Error deleting branch:', error);
          return res.status(500).json({ message: 'Internal server error', status: 500, error: error.message });
     }
};
