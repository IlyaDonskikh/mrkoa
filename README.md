# Mr.Koa Boilerplate

![Node.js CI Tests](https://github.com/IlyaDonskikh/mrkoa/workflows/Node.js%20CI/badge.svg?branch=dev)

Fantastic boilerplate based on the fantastic koa framework that (not a surprise) works fantastic.

<img width="200" src="https://user-images.githubusercontent.com/3100222/90955905-620f2180-e48a-11ea-8081-7b9061a26511.png"/>

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

## Components

The boilerplate working by classic MVC structure and support extra layers to meet modern needs.

As a general overview you may look on the flow like:

1. Routers pass request to controllers and during the process do permission check to use the route.
2. Controller validate the request data and pass the data to Use Case.
3. Use case take care about validation and execution of business logic.
4. Serializer formats the processed data.
5. And controller is back on duty to take control and return the data.

### Use Cases

This is the only way to execute business logic. Pay attention that it is strictly not recommended to use one Use Case from another and prohibited use single Use Case to describe more than one business case.

If you really need to execute some code more than once and it's a part of business logic of a Use Case then you have to use Helpers, if it's not the right way is Utils.

```typescript
interface Request {
  email: string;
}

interface Response {
  user: User;
}

export class UserCreateCase extends BaseCase<Request, Response>() {
  async process() {
    await this.validate(); // it call checks section and throw error if something going wrong
    const user = await User.create({ email: this.request.email });

    return { user };
  }

  // private

  protected async checks() {
    if (!this.request.email) {
      this.errors.add('email', 'presence');
    }
  }
}

const { user } = UserCreateCase.call({ email: 'love@use.case' }); // only right way to run Use Case is static method `call`.
```

### Helpers

Widely used fragments of middleware or supportive business logic (e.g. permission check during session request or model scopes).

### Utils

Various elements designed to serve the application and are not part of the business logic.

### Serializers

Serializers helps us convert the data returned by the controllers.

Like all good and self-respecting serializers, mrkoa serializers support a shortcuts to display model data and the methods to reformat any data on the developer way.

```javascript
import BaseSerializer from '../base.serializer';
import { UserSession } from '../../models/user/session.model';
import SessionDefaultSerializer from '../session/default.serializer';

export default class UserSampleSerializer extends BaseSerializer {
  protected attributes = [
    'id',
    'email',
    this.randomSession,
  ];

  private async randomSession() {
    const session = await UserSessions.findOne({ userId: this.object.id })

    if (!session) { return {}; }

    return SessionDefaultSerializer.serialize(session);
  }
}
```

## Heroku RTG

The boilerplate ready to go with heroku environment. All you need to do is setup the environment variables on heroku side and deploy the app.

## API interaction

All request to the panel should contain header `Authorization: Bearer $token`.

How to generate the token you may see by following examples into the tests: `test/controllers/api/v1/panel/users.controller.test.ts`
