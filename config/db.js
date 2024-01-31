import { Sequelize } from 'sequelize';
import fs from 'fs'

// const db = new Sequelize('CAPOHRMS', 'postgres', '12345', {
//     dialect: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     schema: 'hrms'
// });

const db = new Sequelize('hrms', 'cma', 'cmadb', {
    dialect: 'postgres',
    host: '13.235.182.140',
    port: 5432,
    schema: 'newhrms'
});



export default db;