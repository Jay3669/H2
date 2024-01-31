import { Sequelize } from 'sequelize';

const db = new Sequelize('CAPOHRMS', 'postgres', '3669', {
     dialect: 'postgres',
     host: 'localhost',
     port: 5432,
     schema: 'HRMS'
});

db.authenticate().then(() => {
     console.log(`Database ${db.config.database} connected successfully`);
}).catch((error) => {
     console.error('Unable to connect to the database:', error);
});

export default db;