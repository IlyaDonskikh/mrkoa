# Mr.Koa Boilerplate
![Node.js CI Tests](https://github.com/IlyaDonskikh/koa-devices-boilerplate/workflows/Node.js%20CI/badge.svg?branch=dev)

## Development setup
1. Clone repo.
3. Create development and test databases (PostgreSQL).
4. Create `.env` file in the root folder with following content:

```
PORT=3000
NODE_ENV=development
NODE_APP_TOKEN=token
DATABASE_DEVELOPMENT_URL=postgres://localhost:5432/db_koa_boilerplate_development
DATABASE_TEST_URL=postgres://localhost:5432/db_koa_boilerplate_test
```

Once everything is ready, the last step is `npm install`.

### Database
Boilerplate uses sequelize adapter to working with db. So you may use all sequelize client helpers like `sequelize db:migrate`.

## Development mode
1. Run `npm run dev`


## API interaction
All request to the panel should contain header `Authorization: Bearer $token`.

How to generate the token you may see by following examples into the spec: `test/controllers/api/v1/panel/users.controller.spec.ts`
