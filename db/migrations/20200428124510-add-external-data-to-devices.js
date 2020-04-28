const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.addColumn(
    'devices',
    'external_data',
    { type: Sequelize.DataTypes.JSONB, defaultValue: {} }
  ),
  down: (queryInterface) => queryInterface.removeColumn('devices', 'external_data'),
};
