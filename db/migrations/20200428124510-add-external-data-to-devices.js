const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'devices',
    'external_data',
    { type: Sequelize.DataTypes.JSONB, defaultValue: {} }
  ),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('devices', 'external_data'),
};
