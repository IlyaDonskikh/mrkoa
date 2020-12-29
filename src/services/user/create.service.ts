import { BaseService } from '../base.service';
import EncryptPasswordService from './encrypt.password.service';
import { User } from '../../models/user.model';
import UserValidator from '../../validators/base/user.validator';

interface RequestParams {
  user: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

export default class CreateService extends BaseService<RequestParams>() {
  // Attrs
  private validator: any;

  public user: User;

  // Etc.
  async process() {
    await this.isValid();

    await this.transformAttributes();

    this.user = await User.create(this.requestParams.user);
  }

  // Private
  protected async validate() {
    this.validator = await UserValidator.validate(
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

    const service = await EncryptPasswordService.call({ password });

    this.requestParams.user.password = service.encryptedPassword;
  }

  private async downcaseAttrsEmail() {
    const { email } = this.requestParams.user;

    this.requestParams.user.email = email.toLowerCase();
  }
}
