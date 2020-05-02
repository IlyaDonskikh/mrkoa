import * as faker from 'faker';
import * as crypto from 'crypto';
import { User } from '../../dist/models/user.model';
import EcryptPasswordService from '../../dist/services/user/encrypt.password.service';

const data = async (props = {}) => {
  const password = faker.internet.password();

  const defaultProps = {
    email: faker.internet.email().toLowerCase(),
    password,
    passwordConfirmation: password,
    token: crypto.randomBytes(64).toString('hex'),
  };
  return { ...defaultProps, ...props };
};

const create = async (props = {}) => {
  const attrs: any = await data(props);
  const { password } = attrs;
  const { encryptedPassword } = await EcryptPasswordService.call({ password });

  attrs.password = encryptedPassword;

  return User.create(attrs);
};

const build = async (props = {}) => User.build(await data(props));

export { create, build };
