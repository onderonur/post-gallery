## Post Gallery

Post Gallery is a fullstack GraphQL web application which started as a basic 9GAG clone. It implements the core features of 9GAG like creating posts, commenting and reactions. All the requests are handled by a GraphQL server built with Apollo. Only file uploads and authentication are excluded from GraphQL and implemented as simple REST endpoints.

It has no custom server setup. Only the serverless functions of Next.js are used. This has resulted in a very simple, yet powerful structure.

The project has changed a lot along the way. Trials were carried out with different ORMs like Sequelize, TypeORM, Prisma 2 and Objection/Knex. API and frontend were two separate projects at first, but they were combined after a while as an experiment. Even though it's much cleaner to create separate projects for various reasons, this structure also works pretty well.

### Features

- Creating posts
- Category based post listing
- Comments (with linkifying URLs)
- Reactions
- Social logins (with Google and Facebook)
- Linking social accounts to a single account
- Simple session management
- Social media share buttons
- Basic SEO optimization
- CSRF protection
- GraphQL Query Depth Limit

### Stack

- Framework: [Next.js](https://nextjs.org/)
- GraphQL server: [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- GraphQL client: [Apollo Client](https://www.apollographql.com/docs/react/)
- TypeScript typing generator: [GraphQL Code Generator](https://graphql-code-generator.com/)
- Authentication: [JWT](https://github.com/auth0/node-jsonwebtoken)
- File uploads: [Multer](https://github.com/expressjs/multer)
- Image processing: [Sharp](https://github.com/lovell/sharp)
- Database: [PostgreSQL](https://www.postgresql.org/)
- ORM: [Objection.js](https://vincit.github.io/objection.js/)
- Query builder: [Knex.js](http://knexjs.org/)
- UI components: [Material-UI](https://material-ui.com/)
- Styling: [@emotion/styled](https://emotion.sh/docs/styled)
- Forms: [Formik](https://jaredpalmer.com/formik)
- Form validations: [Yup](https://github.com/jquense/yup)
- Social media share buttons: [react-share](https://github.com/nygardk/react-share)
- SEO: [Next SEO](https://github.com/garmeeh/next-seo)
- Linting: [ESLint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)

### Screenshots

<img  src="/screenshots/posts.jpg"  alt="Posts feed page"/>
<img  src="/screenshots/post.jpg"  alt="Post viewing page"/>
<img  src="/screenshots/creating-post.jpg"  alt="Creating post"/>
<img  src="/screenshots/sessions.jpg"  alt="Session management page"/>

### Development

First, we need to install our dependencies:

#### `npm install`

After that, we need to set a value to all the empty keys (`DB_HOST`, `DB_USER`, `DB_PASSWORD` etc) in `.env` file.
Then, we create a database named `post_gallery` in PostgreSQL.
Lastly, we run the migrations:

#### `npm run migrate:latest`

When the migrations end, we can start the application in development mode with:

#### `npm run dev`

Application will start at `http://localhost:3000`.  
GraphQL Playground is at `http://localhost:3000/api/graphql`.
