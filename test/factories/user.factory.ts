import * as faker from 'faker';
import { User } from '../../src/models/user.model';
import { encryptBySimpleBcrypt } from '../../src/utils/encryptors';

const data = (props: Partial<User> = {}) => {
  const password = faker.internet.password();
  const email = `${faker.random.uuid()}${faker.internet.email().toLowerCase()}`;
  const defaultProps: Partial<User> = {
    email: email,
    password,
    passwordConfirmation: password,
  };
  return { ...defaultProps, ...props };
};

const create = async (props: Partial<User> = {}) => {
  const attrs: Partial<User> = data(props);
  const { password } = attrs;

  if (password) {
    const encryptedPassword = encryptBySimpleBcrypt({
      value: password,
    });

    attrs.password = encryptedPassword;
  }

  return User.create(attrs);
};

const build = (props: Partial<User> = {}) => User.build(data(props));

export { create, build };
