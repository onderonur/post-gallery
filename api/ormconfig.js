require('dotenv').config();

// With this, TypeOrm will look for "ts" files in "development".
// But when we create our "compiled" js files for "production", it will look for them
// under the "dist" folder with ".js" extension.

const options = {
  development: {
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  },
  production: {
    entities: ['dist/entity/**/*.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
  },
};

const ENVIRONMENTS = ['development', 'production'];
const { NODE_ENV } = process.env;
if (!ENVIRONMENTS.includes(NODE_ENV)) {
  throw new Error(`Wrong NODE_ENV definition: ${NODE_ENV}`);
}

const option = options[NODE_ENV];

module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: option.entities,
  migrations: option.migrations,
  subscribers: option.subscribers,
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
