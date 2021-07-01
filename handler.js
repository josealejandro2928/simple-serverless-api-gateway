'use strict';
const connectToDatabase = require('./db'); // initialize connection
const { errorHandler } = require('./helpers/utils');
const path = require('path');
const fs = require('fs');

module.exports.healthCheck = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const models = await connectToDatabase();
    console.log('Connection successful.');
    let response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Connection successful.',
        models: models,
      }),
    };
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};

module.exports.migrate = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { sequelize, Sequelize } = await connectToDatabase();
    console.log('Connection successful.');
    const queryInterface = sequelize.getQueryInterface();
    let type = event;

    await queryInterface.createTable('SequelizeMeta', {
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    });
    let [allMigrationsCreated] = await sequelize.query(
      `SELECT * from SequelizeMeta`
    );

    let migrationsPath = path.resolve('migrations');
    let filesToMigrate = fs.readdirSync(migrationsPath);
    let filesMigratedUp = [];
    let filesMigratedDown = [];

    if (type == 'up') {
      for (let migrationFile of filesToMigrate) {
        let dataSerial = migrationFile.split('.');
        let dataType = dataSerial[dataSerial.length - 1];
        if (dataType == 'js') {
          let { up } = require(`${migrationsPath}/${migrationFile}`);
          if (
            !allMigrationsCreated.find((item) => item.name == migrationFile)
          ) {
            console.log('up: ', migrationFile);
            filesMigratedUp.push(migrationFile);
            await up(queryInterface, Sequelize);
            await sequelize.query(
              `INSERT INTO SequelizeMeta (name) VALUES ('${migrationFile}');`
            );
          }
        }
      }
    } else if (type == 'down') {
      let [lastMigration] = await sequelize.query(
        `SELECT * from SequelizeMeta order by name DESC limit 1`
      );
      lastMigration = (lastMigration[0] || {}).name;
      if (
        lastMigration &&
        fs.existsSync(`${migrationsPath}/${lastMigration}`)
      ) {
        let { down } = require(`${migrationsPath}/${lastMigration}`);
        filesMigratedDown.push(lastMigration);
        console.log('down: ', lastMigration);
        await down(queryInterface, Sequelize);
        await sequelize.query(
          `DELETE FROM SequelizeMeta WHERE (name = '${lastMigration}');`
        );
      }
    }

    let response = {
      statusCode: 200,
      body: JSON.stringify({
        filesMigratedUp,
        filesMigratedDown,
      }),
    };
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
