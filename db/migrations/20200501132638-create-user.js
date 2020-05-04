module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique : true
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        token: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
        }
      });

      await queryInterface.sequelize.query('CREATE UNIQUE INDEX ON users (token) WHERE token IS NOT NULL;', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
