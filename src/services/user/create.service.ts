import BaseService from '../base.service';
import EncryptPasswordService from './encrypt.password.service';
import { User } from '../../models/user.model';
import UserValidator from '../../validators/base/user.validator';

export default class CreateService extends BaseService {
  // Attrs
  attrs: any;

  private validator: any;

  public user: User;

  // Etc.
  async process() {
    if (!(await this.isValid())) { return; }

    await this.transformAttributes();

    this.user = await User.create(this.attrs);
  }

  // Private
  private async validate() {
    this.validator = await UserValidator.validate(this.errors, User.build(), this.attrs);

    this.errors = this.validator.errors;
  }

  private async transformAttributes() {
    this.updateAttrsByValidator();
    await this.encryptAttrsPassword();
    await this.downcaseAttrsEmail();
  }

  private updateAttrsByValidator() {
    this.attrs = this.validator.attrs;
  }

  private async encryptAttrsPassword() {
    const { password } = this.attrs;

    const service = await EncryptPasswordService.call({ password });

    this.attrs.password = service.encryptedPassword;
  }

  private async downcaseAttrsEmail() {
    const { email } = this.attrs;

    this.attrs.email = email.toLowerCase();
  }
}
