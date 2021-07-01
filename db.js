const path = require('path');
const Sequelize = require('sequelize');

console.log('Environment de Node:', process.env.NODE_ENV);
let environment = process.env.NODE_ENV || 'dev';
let pathConfig = path.resolve('config');
const config = require(`${pathConfig}/config.js`)[environment];

//////CONFIGURE THE ORM CONNECTION/////////////
process.env.DB_NAME = config.database;
process.env.DB_USERNAME = config.username;
process.env.DB_PASSWORD = config.password;
process.env.DB_DIALECT = config.dialect;
process.env.DB_HOST = config.host;
process.env.DB_PORT = config.port;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    define: {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
    sync: {
      force: false,
    },
  }
);
///////LOADDING MODELS///////////////////
const PetModel = require('./models/pet');
const BreedModel = require('./models/breed');
//////////////////////////////////////////
console.log('\x1b[32m', 'Loading models...');
const Pet = PetModel(sequelize, Sequelize);
const Breed = BreedModel(sequelize, Sequelize);
const Models = { Pet, Breed, sequelize, Sequelize };

console.log('\x1b[32m', 'Excecuting asociations models');
/////ASOCIATIONS//////////////////////
Object.keys(Models).map((model) => {
  if (Models[model].associate && Models[model].associate instanceof Function) {
    Models[model].associate(Models);
  }
});
///////////////////////////////////////
const connection = {};

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing connection.');
    return Models;
  }
  // await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  console.log('=> Created a new connection.');
  return Models;
};
