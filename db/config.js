require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_DEVELOPMENT_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.DATABASE_TEST_URL,
    dialect: 'postgres',
    logging: true,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
