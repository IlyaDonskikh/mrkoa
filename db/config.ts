import 'dotenv/config';
import { Dialect } from 'sequelize';

export default {
  development: {
    url: process.env.DATABASE_DEVELOPMENT_URL as string,
    dialect: 'postgres' as Dialect,
  },
  test: {
    url: process.env.DATABASE_TEST_URL as string,
    dialect: 'postgres' as Dialect,
    logging: false,
  },
  production: {
    url: process.env.DATABASE_URL as string,
    dialect: 'postgres' as Dialect,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
