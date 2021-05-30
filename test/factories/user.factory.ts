import * as faker from 'faker';
import { User } from '../../src/models/user.model';
import { encryptBySimpleBcrypt } from '../../src/utils/encryptors';

export class UserFactory {
  static async create(props: Partial<User> = {}) {
    const attrs: Partial<User> = this.data(props);
    const { password } = attrs;

    if (password) {
      const encryptedPassword = encryptBySimpleBcrypt({
        value: password,
      });

      attrs.password = encryptedPassword;
    }

    return User.create(attrs);
  }

  static build(props: Partial<User> = {}) {
    return User.build(this.data(props));
  }

  // private
  private static data(props: Partial<User> = {}) {
    const password = faker.internet.password();
    const email = `${faker.random.uuid()}${faker.internet
      .email()
      .toLowerCase()}`;
    const defaultProps: Partial<User> = {
      email: email,
      password,
      passwordConfirmation: password,
    };
    return { ...defaultProps, ...props };
  }
}
