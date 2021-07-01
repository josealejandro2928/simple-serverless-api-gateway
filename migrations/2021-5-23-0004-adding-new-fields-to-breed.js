'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Breed', 'description', {
      type: Sequelize.STRING,
    });
  },
  down: function (queryInterface) {
    return queryInterface.removeColumn('Breed', 'description');
  },
};
