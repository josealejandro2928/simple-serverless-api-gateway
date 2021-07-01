'use strict';

var tableName = 'Breed';

module.exports = {
  up: function (queryInterface, Sequelize) {
    let tableDefinition = {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    };
    return queryInterface.createTable(tableName, tableDefinition);
  },
  down: function (queryInterface) {
    return queryInterface.dropTable(tableName);
  },
};
