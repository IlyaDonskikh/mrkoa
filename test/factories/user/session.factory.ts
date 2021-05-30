import * as faker from 'faker';
import { User } from '../../../src/models/user.model';
import { UserSession } from '../../../src/models/user/session.model';
import * as userFactory from '../user.factory';

const data = async (props: Partial<UserSession> = {}) => {
  const defaultProps: Partial<UserSession> = {
    token: faker.lorem.word(),
  };

  if (!props.userId) {
    const user: User = await userFactory.create();
    defaultProps.userId = user.id;
  }

  return { ...defaultProps, ...props };
};

const create = async (props: Partial<UserSession> = {}) =>
  UserSession.create(await data(props));

const build = async (props: Partial<UserSession> = {}) =>
  UserSession.build(await data(props));

export { create, build };
