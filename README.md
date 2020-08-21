# Mr.Koa Boilerplate
![Node.js CI Tests](https://github.com/IlyaDonskikh/koa-devices-boilerplate/workflows/Node.js%20CI/badge.svg?branch=dev)

## Development setup
1. Clone repo.
2. Copy `.env.sample` file and rename it to `.env`.
3. Run `npm install`
4. Create database by `sequelize db:create`.
4. Run migrations `sequelize db:migrate`

Once everything is ready, the last step is start the server `npm run dev`.

## Tests
You have to follow only few extra steps to run the test:

1. Create test db `sequelize db:create --env test`
2. Run tests `npm test`

That's it!

## API interaction
All request to the panel should contain header `Authorization: Bearer $token`.

How to generate the token you may see by following examples into the spec: `test/controllers/api/v1/panel/users.controller.spec.ts`
