import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import BaseService from '../base.service';
import { User } from '../../models/user.model';

export default class SignInService extends BaseService {
  // Attrs
  email: string | undefined;

  password: string | undefined;

  private token: string | null = null;

  public user: User | null = null;

  // Etc.
  async process() {
    await this.setupVariables();

    if (!(await this.isValid())) { return; }

    await this.assignNewUniqToken();

    this.user = await this.user.update({ token: this.token });
  }

  private async assignNewUniqToken() {
    let user: any = null;

    /* eslint-disable no-await-in-loop */
    while (this.token === null) {
      const token: string = crypto.randomBytes(64).toString('hex');
      user = await User.findOne({ where: { token } });

      if (!user) { this.token = token; }
    }
    /* eslint-disable no-await-in-loop */
  }

  private async validate() {
    if (this.password === undefined) { this.errors.add('password', 'presence'); }
    if (this.email === undefined) { this.errors.add('email', 'presence'); }
    if (!this.user) { this.errors.add('email', 'find'); }
    if (!(await this.isPasswordValid())) { this.errors.add('password', 'valid'); }
  }

  private async isPasswordValid() {
    if (!this.user || this.password === undefined) { return false; }

    const match = await bcrypt.compare(this.password, this.user.password);

    return match;
  }

  private async setupVariables() {
    await this.setupVariablesUser();
  }

  private async setupVariablesUser() {
    if (this.email === undefined) { return; }

    this.user = await User.findOne({ where: { email: this.email } });
  }
}
