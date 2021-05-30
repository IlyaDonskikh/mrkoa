import * as faker from 'faker';
import * as crypto from 'crypto';
import { User } from '../../src/models/user.model';
import { encryptBySimpleBcrypt } from '../../src/utils/encryptors';

const data = (props: Partial<User> = {}) => {
  const password = faker.internet.password();
  const email = `${faker.random.uuid()}${faker.internet.email().toLowerCase()}`;
  const defaultProps = {
    email: email,
    password,
    passwordConfirmation: password,
    token: crypto.randomBytes(64).toString('hex'),
  };
  return { ...defaultProps, ...props };
};

const create = async (props: Partial<User> = {}) => {
  const attrs: any = data(props);
  const { password } = attrs;
  const encryptedPassword = encryptBySimpleBcrypt({
    value: password,
  });

  attrs.password = encryptedPassword;

  return User.create(attrs);
};

const build = (props: Partial<User> = {}) => User.build(data(props));

export { create, build };
