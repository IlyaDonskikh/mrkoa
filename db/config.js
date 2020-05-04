module.exports = {
  development: {
    url: 'postgres://localhost:5432/aircon_development',
    dialect: 'postgres',
  },
  test: {
    url: 'postgres://localhost:5432/aircon_test',
    dialect: 'postgres',
    logging: false,
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
