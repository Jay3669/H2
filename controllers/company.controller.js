import Company from "../models/company.model.js";

export const createCompany = async (req, res) => {
     const { companyName, TAN, PAN, GST, companyLogo, industryVertical, mobileNumber, email, website, companyAddress, status = 'ACTIVE' } = req.body;
     try {
          await Company.sync({ force: false });
          const existingTAN = await Company.findOne({ where: { TAN } });
          const existingCompanyName = await Company.findOne({ where: { companyName } });
          const existingGST = await Company.findOne({ where: { GST } });

          if (existingTAN || existingCompanyName || existingGST) {
               let errorMessage = '';
               let resultType = '';

               if (existingTAN) {
                    errorMessage = `Tax Deduction Account Number ${existingTAN.TAN} already exists`;
                    resultType = 'TAN';
               } else if (existingCompanyName) {
                    errorMessage = `Company Name ${existingCompanyName.companyName} already exists`;
                    resultType = 'companyName';
               } else if (existingGST) {
                    errorMessage = `Goods and Services Tax Number ${existingGST.GST} already exists`;
                    resultType = 'GST';
               }

               return res.status(200).json({
                    message: errorMessage,
                    status: 400,
                    result: resultType,
               });
          }

          const create = { companyName, TAN, PAN, GST, companyLogo, industryVertical, mobileNumber, email, website, companyAddress, status };
          const createdCompany = await Company.create(create);

          return res.status(200).json({
               message: 'Company created successfully',
               status: 200,
               result: createdCompany,
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

export const getAllCompanies = async (req, res) => {
     try {
          const allCompanies = await Company.findAll();

          return res.status(200).json({
               message: 'All companies fetched successfully',
               status: 200,
               result: allCompanies,
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

export const updateCompany = async (req, res) => {
     const { id, ...updates } = req.body;

     try {
          let existingCompany = await Company.findByPk(id);

          if (!existingCompany) {
               return res.status(200).json({ message: `Company with id ${existingCompany.companyName} not found`, status: 404 });
          }

          existingCompany = await existingCompany.update(updates);

          return res.status(200).json({
               message: `Company ${existingCompany.companyName} updated successfully`,
               status: 200,
               result: existingCompany,
          });
     } catch (error) {
          console.error("Error updating company:", error);
          return res.status(500).json({
               message: 'Internal server error',
               status: 500,
               error: error.message,
          });
     }
};

export const deleteCompany = async (req, res) => {
     const { id } = req.query;

     try {
          const existingCompany = await Company.findByPk(id);

          if (!existingCompany) {
               return res.status(404).json({ message: `Company ${existingCompany.companyName} not found`, status: 404 });
          }

          await existingCompany.destroy();

          return res.status(200).json({
               message: `Company ${existingCompany.companyName} deleted successfully`,
               status: 200,
          });
     } catch (error) {
          console.error("Error deleting company:", error);
          return res.status(500).json({
               message: 'Internal server error',
               status: 500,
               error: error.message,
          });
     }
};
