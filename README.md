# Mr.Koa Boilerplate
![Node.js CI Tests](https://github.com/IlyaDonskikh/mrkoa/workflows/Node.js%20CI/badge.svg?branch=dev)

Fantastic boilerplate based on the fantastic koa framework that (not a surprise) works fantastic.

<img width="200" src="https://user-images.githubusercontent.com/3100222/90955905-620f2180-e48a-11ea-8081-7b9061a26511.png"/>

## Development setup
1. Clone repo.
2. Copy `.env.sample` file and rename it to `.env`.
3. Run `npm install`.
4. Create database by `sequelize db:create`.
4. Run migrations `sequelize db:migrate`.

Once everything is ready, the last step is start the server `npm run dev`.

## Tests
You have to follow only few extra steps to run the tests:

1. Create test db `sequelize db:create --env test`
2. Run tests `npm test`

That's it!

## Components

The boilerplate working by classic MVC structure and support extra layers to meet modern needs.

### Validators

### Serializers

## Heroku RTG

The boilerplate ready to go with heroku environment. All you need is a setup environments variables on heroku side and deploy the app.

## API interaction
All request to the panel should contain header `Authorization: Bearer $token`.

How to generate the token you may see by following examples into the spec: `test/controllers/api/v1/panel/users.controller.spec.ts`
