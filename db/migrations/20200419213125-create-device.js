
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('devices', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    externalId: {
      type: Sequelize.STRING,
      field: 'external_id',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'created_at',
      timestamps: true,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'updated_at',
      timestamps: true,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('devices'),
};
