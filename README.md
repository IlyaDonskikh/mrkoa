# Koa Boilerplate

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
1. Run `tsc -w`
2. Run `nodemon .`


## API interaction
All request to the panel should contai header `Authorization: Bearer $token`.

How to generate the token you may see by following examples into the spec: `test/controllers/api/v1/panel/devices.controller.spec.ts`