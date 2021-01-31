import { User } from '../../../models/user.model';
import { encryptBySimpleBcrypt } from '../../../utils/encryptors';
import { PanelUserValidator } from '../../../validators/panel/user.validator';
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
  // Attrs
  private validator: any;

  // Etc.
  async process() {
    await this.validate();

    await this.transformAttributes();

    this.response = {
      user: await User.create(this.request.user),
    };
  }

  // Private
  protected async checks() {
    this.validator = await PanelUserValidator.validate(
      this.errors,
      User.build(),
      this.request.user,
    );

    this.errors = this.validator.errors;
  }

  private async transformAttributes() {
    this.updateAttrsByValidator();
    await this.encryptAttrsPassword();
    await this.downcaseAttrsEmail();
  }

  private updateAttrsByValidator() {
    this.request.user = this.validator.attrs;
  }

  private async encryptAttrsPassword() {
    const { password } = this.request.user;

    const encryptedPassword = encryptBySimpleBcrypt({ value: password });

    this.request.user.password = encryptedPassword;
  }

  private async downcaseAttrsEmail() {
    const { email } = this.request.user;

    this.request.user.email = email.toLowerCase();
  }
}
