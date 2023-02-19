const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    logging: false,
});

sequelize
    .authenticate()
    .then(() => console.log('Connection success'))
    .catch(error => console.error('Unable to connect to the database:', error));


module.exports = sequelize;
