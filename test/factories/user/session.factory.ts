import faker from 'faker';

import { UserSession } from '../../../src/models/user/session.model';
import { UserFactory } from '../user.factory';

export class UserSessionFactory {
  static async create(props: Partial<UserSession> = {}) {
    const data = await this.data(props);

    return UserSession.create(data);
  }

  static async build(props: Partial<UserSession> = {}) {
    const data = await this.data(props);

    return UserSession.build(data);
  }

  // private
  private static async data(props: Partial<UserSession> = {}) {
    const userId = await this.getUserId({ props });

    const defaultProps = {
      token: faker.lorem.word(),
      userId,
    };

    return { ...defaultProps, ...props };
  }

  private static async getUserId({ props }: { props: Partial<UserSession> }) {
    const userId = props.userId;

    if (userId) return userId;

    const user = await UserFactory.create();

    return user.id;
  }
}
