import Knex from 'knex';
import { ID } from '@api/shared/shared.types';
import { Model } from 'objection';
import { isDev } from '@shared/isDev';
import { generateId } from './db.utils';

// https://github.com/irustm/koa-knex-typescript-example/blob/master/src/server/db/connection.ts
const config = require('../../knexfile').development;

declare global {
  namespace NodeJS {
    interface Global {
      __KNEX_DB_CONNECTION__: Knex;
    }
  }
}

function getKnexConnection() {
  if (!isDev()) {
    return Knex(config);
  }

  // This `global` hack solves a long-standing issue appearing in development more,
  // when successive hot-reloads lead to connections being leaked and eventually produce
  // an unrecoverable error
  // https://github.com/vercel/next.js/issues/7811#issuecomment-679076060
  if (!global.__KNEX_DB_CONNECTION__) {
    global.__KNEX_DB_CONNECTION__ = Knex(config);
  }
  return global.__KNEX_DB_CONNECTION__;
}

export const knex = getKnexConnection();

Model.knex(knex);

export class BaseModel extends Model {
  id: ID;
  createdAt: Date;
  updatedAt: Date;

  // https://github.com/Vincit/objection.js/issues/46#issuecomment-496481331
  $beforeInsert() {
    if (!this.id) {
      this.id = generateId();
    }
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
