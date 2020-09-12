import 'dotenv/config';
import path from 'path';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: '_migrations',
      directory: path.join(__dirname, 'api', 'db', 'migrations'),
      extension: 'ts',
    },
  },
};
