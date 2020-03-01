require('dotenv').config();

// With this, TypeOrm will look for "ts" files in "development".
// But when we create our "compiled" js files for "production", it will look for them
// under the "dist" folder with ".js" extension.

const options = {
  development: {
    entities: ['src/db/entity/**/*.ts'],
    migrations: ['src/db/migration/**/*.ts'],
    subscribers: ['src/db/subscriber/**/*.ts'],
  },
  production: {
    entities: ['dist/db/entity/**/*.js'],
    migrations: ['dist/db/migration/**/*.js'],
    subscribers: ['dist/db/subscriber/**/*.js'],
  },
};

const { NODE_ENV } = process.env;

const option = options[NODE_ENV];

if (!option) {
  throw new Error(
    `Can not find the ormconfig option for NODE_ENV value: "${NODE_ENV}"`,
  );
}

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
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber',
  },
};
