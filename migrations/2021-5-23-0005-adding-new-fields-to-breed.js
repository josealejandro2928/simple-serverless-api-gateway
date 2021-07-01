'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Breed', 'type', {
      type: Sequelize.STRING,
      defaultValue: 'Type 1',
    });
  },
  down: function (queryInterface) {
    return queryInterface.removeColumn('Breed', 'type');
  },
};
