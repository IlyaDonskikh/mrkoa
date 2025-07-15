module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'user_sessions',
        {
          uuid: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          token: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          userUUID: {
            allowNull: false,
            type: Sequelize.UUID,
            references: { model: 'users', key: 'uuid' },
            field: 'user_uuid',
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
          deletedAt: {
            type: Sequelize.DATE,
            field: 'deleted_at',
          },
        },
        { transaction },
      );

      await queryInterface.addIndex('user_sessions', ['user_id'], {
        transaction,
      });
      await queryInterface.addIndex('user_sessions', ['token'], {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_sessions');
  },
};
