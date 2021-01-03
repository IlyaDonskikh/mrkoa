import { BaseCase } from '../base.case';
import { UserEncryptPasswordCase } from './encrypt.password.case';
import { User } from '../../models/user.model';
import { PanelUserValidator } from '../../validators/panel/user.validator';

interface RequestParams {
  user: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}
export class UserCreateCase extends BaseCase<RequestParams>() {
  // Attrs
  private validator: any;

  public user: User;

  // Etc.
  async process() {
    await this.validate();

    await this.transformAttributes();

    this.user = await User.create(this.requestParams.user);
  }

  // Private
  protected async checks() {
    this.validator = await PanelUserValidator.validate(
      this.errors,
      User.build(),
      this.requestParams.user,
    );

    this.errors = this.validator.errors;
  }

  private async transformAttributes() {
    this.updateAttrsByValidator();
    await this.encryptAttrsPassword();
    await this.downcaseAttrsEmail();
  }

  private updateAttrsByValidator() {
    this.requestParams.user = this.validator.attrs;
  }

  private async encryptAttrsPassword() {
    const { password } = this.requestParams.user;

    const useCase = await UserEncryptPasswordCase.call({ password });

    this.requestParams.user.password = useCase.encryptedPassword;
  }

  private async downcaseAttrsEmail() {
    const { email } = this.requestParams.user;

    this.requestParams.user.email = email.toLowerCase();
  }
}
