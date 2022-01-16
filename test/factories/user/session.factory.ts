import faker from 'faker';
import { User } from '../../../src/models/user.model';
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
    const defaultProps: Partial<UserSession> = {
      token: faker.lorem.word(),
    };

    if (!props.userId) {
      const user: User = await UserFactory.create();
      defaultProps.userId = user.id;
    }

    return { ...defaultProps, ...props };
  }
}
