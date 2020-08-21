import * as faker from 'faker';
import { UserSession } from '../../../src/models/user/session.model';
import * as userFactory from '../user.factory';

const data = async (props: any = {}) => {
  const defaultProps: object | any = {
    token: faker.lorem.word(),
  };

  if (!props.userId) {
    const user: any = await userFactory.create();
    defaultProps.userId = user.id;
  }

  return { ...defaultProps, ...props };
};

const create = async (props = {}) => UserSession.create(await data(props));

const build = async (props = {}) => UserSession.build(await data(props));

export { create, build };
