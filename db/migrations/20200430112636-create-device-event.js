
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('device_events', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        value: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        initiatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'initiated_at',
        },
        deviceId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'devices', key: 'id' },
          field: 'device_id',
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
        }
      }, { transaction });

      await queryInterface.addIndex('device_events', ['device_id', 'value'], { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('DeviceEvents'),
};
