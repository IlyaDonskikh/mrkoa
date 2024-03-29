import isEmail from 'validator/lib/isEmail';

import { User } from '../../../models/user.model';
import { encryptBySimpleBcrypt } from '../../../utils/encryptors';
import { UseCase } from '../../../utils/use.case';

interface Request {
  user: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

interface Response {
  user: User;
}

export class PanelUserCreateCase extends UseCase<Request, Response>() {
  // attrs
  private readonly minPasswordLength: number = 6;

  // process
  async process() {
    await this.validate();

    const user = await this.createUser();

    return { user };
  }

  // private
  protected async checks() {
    this.checksPassword();
    await this.checksEmail();
  }

  private checksPassword() {
    const { password, passwordConfirmation } = this.request.user;

    if (password.length < this.minPasswordLength) {
      this.errors.add('password', 'length', {
        replacements: { length: String(this.minPasswordLength) },
      });
    }
    if (password !== passwordConfirmation) {
      this.errors.add('password', 'confirmation');
    }
  }

  private async checksEmail() {
    const { email } = this.request.user;

    if (!isEmail(email)) {
      this.errors.add('email', 'format');

      return;
    }

    const isEmailUniq = await this.isEmailUniq();

    if (!isEmailUniq) {
      this.errors.add('email', 'uniq');
    }
  }

  private async isEmailUniq() {
    const { email } = this.request.user;

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    return user === null;
  }

  private createUser() {
    const email = this.request.user.email.toLowerCase();
    const password = encryptBySimpleBcrypt({
      value: this.request.user.password,
    });

    return User.create({ email, password });
  }
}
