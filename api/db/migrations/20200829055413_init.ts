import * as Knex from 'knex';
import { generateId } from '../utils/generateId';

const createSharedColumns = (knex: Knex, table: Knex.CreateTableBuilder) => {
  table.string('id').primary();
  table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updatedAt');
};

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('User', (table) => {
      createSharedColumns(knex, table);
      table.string('googleProfileId').unique();
      table.string('facebookProfileId').unique();
      table.string('displayName', 50).notNullable();
      table.string('email', 320).notNullable().unique();
      table.string('thumbnailUrl').unique();
    })
    .createTable('AuthToken', (table) => {
      createSharedColumns(knex, table);
      table.string('jti').notNullable().unique();
      table.string('browser');
      table.string('platform');
      table.string('os');
      table
        .string('userId')
        .notNullable()
        .references('id')
        .inTable('User')
        .onDelete('CASCADE');
    })
    .createTable('Category', (table) => {
      createSharedColumns(knex, table);
      table.string('name', 100).unique().notNullable();
      table.string('slug', 100).unique().notNullable();
      table.integer('order').unique().unsigned().notNullable();
    })
    .createTable('Post', (table) => {
      createSharedColumns(knex, table);
      table.string('title', 200).notNullable();
      table
        .string('categoryId')
        .notNullable()
        .references('id')
        .inTable('Category')
        .onDelete('CASCADE');
      table
        .string('userId')
        .notNullable()
        .references('id')
        .inTable('User')
        .onDelete('CASCADE');
    })
    .createTable('Media', (table) => {
      createSharedColumns(knex, table);
      table.integer('thumbnailWidth').notNullable().unsigned();
      table.integer('thumbnailHeight').notNullable().unsigned();
      table.string('thumbnailUrl').notNullable();
      table.integer('smallImageWidth').notNullable().unsigned();
      table.integer('smallImageHeight').notNullable().unsigned();
      table.string('smallImageUrl').notNullable();
      table.integer('standardImageWidth').notNullable().unsigned();
      table.integer('standardImageHeight').notNullable().unsigned();
      table.string('standardImageUrl').notNullable();
      table
        .string('postId')
        .unique()
        .references('id')
        .inTable('Post')
        .onDelete('CASCADE');
    })
    .createTable('Comment', (table) => {
      createSharedColumns(knex, table);
      table.string('text', 1000).notNullable();
      table
        .string('userId')
        .notNullable()
        .references('id')
        .inTable('User')
        .onDelete('CASCADE');
      table
        .string('postId')
        .notNullable()
        .references('id')
        .inTable('Post')
        .onDelete('CASCADE');
    })
    .createTable('Reactable', (table) => {
      createSharedColumns(knex, table);
      table.enum('type', ['POST', 'COMMENT'], {
        enumName: 'ReactableType',
        useNative: true,
      });
      table
        .string('postId')
        .unique()
        .references('id')
        .inTable('Post')
        .onDelete('CASCADE');
      table
        .string('commentId')
        .unique()
        .references('id')
        .inTable('Comment')
        .onDelete('CASCADE');
    })
    .createTable('Reaction', (table) => {
      createSharedColumns(knex, table);
      table
        .string('reactableId')
        .notNullable()
        .references('id')
        .inTable('Reactable')
        .onDelete('CASCADE');
      table
        .string('userId')
        .notNullable()
        .references('id')
        .inTable('User')
        .onDelete('CASCADE');
      table.unique(['reactableId', 'userId']);
      table
        .enum('type', ['LIKE', 'DISLIKE'], {
          enumName: 'ReactionType',
          useNative: true,
        })
        .notNullable();
    });

  // Seed data
  await knex('Category').insert([
    {
      id: generateId(),
      name: 'Funny',
      slug: 'funny',
      order: 1,
    },
    {
      id: generateId(),
      name: 'Random',
      slug: 'random',
      order: 2,
    },
    {
      id: generateId(),
      name: 'Anime & Manga',
      slug: 'anime-manga',
      order: 3,
    },
    {
      id: generateId(),
      name: 'Gaming',
      slug: 'gaming',
      order: 4,
    },
    {
      id: generateId(),
      name: 'Comics',
      slug: 'comics',
      order: 5,
    },
    {
      id: generateId(),
      name: 'Movie & TV',
      slug: 'movie-tv',
      order: 6,
    },
    {
      id: generateId(),
      name: 'Animals',
      slug: 'animals',
      order: 7,
    },
    {
      id: generateId(),
      name: 'Fashion & Beauty',
      slug: 'fashion-beauty',
      order: 8,
    },
    {
      id: generateId(),
      name: 'Design',
      slug: 'design',
      order: 9,
    },
    {
      id: generateId(),
      name: 'Science & Tech',
      slug: 'science-tech',
      order: 10,
    },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTable('Reaction')
    .dropTable('Reactable')
    .dropTable('Comment')
    .dropTable('Media')
    .dropTable('Post')
    .dropTable('Category')
    .dropTable('AuthToken')
    .dropTable('User')
    .raw('DROP TYPE "ReactionType"')
    .raw('DROP TYPE "ReactableType"');
}
