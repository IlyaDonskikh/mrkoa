# Mr.Koa Boilerplate

![Node.js CI Tests](https://github.com/IlyaDonskikh/mrkoa/workflows/Node.js%20CI/badge.svg?branch=dev)

Fantastic boilerplate based on the fantastic koa framework that (not a surprise) works fantastic.

<img width="200" src="https://user-images.githubusercontent.com/3100222/90955905-620f2180-e48a-11ea-8081-7b9061a26511.png"/>

## Introduction

`Mr.Koa` is designed to solve business challenges with quality and speed from day one.

## Development setup

1. Clone repo.
2. Setup environment variables `cp .env.sample .env`.
3. Run `npm install`.
4. Create database by `npm run db:create`.
5. Run migrations `npm run db:migrate`.

Once everything is ready, the last step is start the server `npm run dev`.

## Tests

You have to follow only few extra steps to run the tests:

1. Create test db `npm run db:create:test`
2. Run migrations `npm run db:migrate:test`.
3. Run tests `npm test`

That's it!

## Heroku RTG

The boilerplate ready to go with heroku environment. All you need to do is setup the environment variables on heroku side and deploy the app.

## API interaction

All request to the panel should contain header `Authorization: Bearer $token`.

How to generate the token you may see by following examples into the tests: `test/controllers/api/v1/panel/users.controller.test.ts`
