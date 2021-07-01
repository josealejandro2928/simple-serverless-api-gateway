'use strict';

var tableName = 'Pet';

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
      typeAnimal: {
        type: Sequelize.ENUM,
        values: ['dog', 'cat', 'bird', 'mouse'],
        defaultValue: 'dog',
        allowNull: false,
      },
      BreedId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Breed',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.DOUBLE,
      },
      primaryColor: {
        type: Sequelize.STRING,
      },
      secundaryColor: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DOUBLE,
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
    return queryInterface
      .createTable(tableName, tableDefinition)
      .catch((error) => {
        console.log(error);
      });
  },
  down: function (queryInterface) {
    return queryInterface.dropTable(tableName).catch((error) => {
      console.log(error);
    });
  },
};
