import { faker } from '@faker-js/faker';

import { UserSession } from '../../../src/models/user/session.model';

type UserSessionProps = Partial<UserSession> &
  Required<Pick<UserSession, 'userUUID'>>;

export class UserSessionFactory {
  static async create(props: UserSessionProps) {
    const data = await this.data(props);

    return UserSession.create(data);
  }

  static async build(props: UserSessionProps) {
    const data = await this.data(props);

    return UserSession.build(data);
  }

  // private

  private static async data(props: UserSessionProps) {
    const defaultProps = {
      token: faker.lorem.word(),
    };

    return { ...defaultProps, ...props };
  }
}
