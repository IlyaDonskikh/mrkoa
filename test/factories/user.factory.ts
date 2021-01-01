import * as faker from 'faker';
import * as crypto from 'crypto';
import { User } from '../../src/models/user.model';
import { UserEncryptPasswordService } from '../../src/services/user/encrypt.password.service';

const data = async (props = {}) => {
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

const create = async (props = {}) => {
  const attrs: any = await data(props);
  const { password } = attrs;
  const { encryptedPassword } = await UserEncryptPasswordService.call({
    password,
  });

  attrs.password = encryptedPassword;

  return User.create(attrs);
};

const build = async (props = {}) => User.build(await data(props));

export { create, build };
