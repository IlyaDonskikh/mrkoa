import { _ } from 'lodash';
import { Op } from 'sequelize';
import BaseValidator from '../base.validator';
import { User } from '../../models/user.model';

export default class PanelUserValidator extends BaseValidator {
  private minPasswordLength = 6;

  private permittedAttributes: string[] = ['email', 'password', 'passwordConfirmation'];

  async runValidations() {
    const { email, password, passwordConfirmation } = this.mergedAttrs;

    if (password !== undefined && password.length < this.minPasswordLength) {
      this.errors.add('password', 'length');
    }
    if (password !== passwordConfirmation) { this.errors.add('password', 'confirmation'); }
    if (email === undefined) { this.errors.add('email', 'presence'); }

    const emailUniq = await (this.emailUniq(email));

    if (!emailUniq) { this.errors.add('email', 'uniq'); }
  }

  private async emailUniq(email: string | undefined) {
    if (email === undefined) { return true; }

    const user = await User.findOne({
      where: {
        email,
        [Op.not]: { id: this.modelInstance.id },
      },
    });

    return user === null;
  }
}
