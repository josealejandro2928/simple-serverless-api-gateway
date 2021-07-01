module.exports = {
  local: {
    database: 'petsdev',
    host: 'localhost',
    username: 'root',
    password: 'lolo2928',
    dialect: 'mysql',
    port: 3306,
  },
  dev: {
    database: 'petsdev',
    host: 'petsdev.cluster-c3hcf9edswdo.us-east-1.rds.amazonaws.com',
    username: 'admin',
    password: '12345678',
    dialect: 'mysql',
    port: 3306,
  },
};
