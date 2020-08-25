# Mr.Koa Boilerplate
![Node.js CI Tests](https://github.com/IlyaDonskikh/mrkoa/workflows/Node.js%20CI/badge.svg?branch=dev)

Fantastic boilerplate based on the fantastic koa framework that (not a surprise) works fantastic.

<img width="200" src="https://user-images.githubusercontent.com/3100222/90955905-620f2180-e48a-11ea-8081-7b9061a26511.png"/>

## Development setup
1. Clone repo.
2. Setup environment variables `cp .env.sample .env`.
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

The layer serve to give direct and comprehensive answer about current validation status of dataset.

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

How to generate the token you may see by following examples into the tests: `test/controllers/api/v1/panel/users.controller.spec.ts`
