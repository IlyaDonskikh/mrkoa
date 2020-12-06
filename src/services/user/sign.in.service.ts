import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import BaseService from '../base.service';
import { User } from '../../models/user.model';
import { UserSession } from '../../models/user/session.model';

interface RequestParams {
  email: string;
  password: string;
}

export default class SignInService extends BaseService<RequestParams>() {
  // Attrs
  protected localePath = 'services.user.signInService';

  private user: User | null = null;

  public session: UserSession;

  // Etc.
  async process() {
    await this.setupVariables();

    if (!(await this.isValid())) {
      return;
    }

    this.session = await UserSession.create({
      userId: this.user!.id,
      token: await this.buildNewUniqToken(),
    });
  }

  private async validate() {
    if (this.requestParams.email === undefined) {
      this.errors.add('password', 'presence');
    }
    if (this.requestParams.email === undefined) {
      this.errors.add('email', 'presence');
    }
    if (!this.user) {
      this.errors.add('email', 'find');
    }
    if (!(await this.isPasswordValid())) {
      this.errors.add('password', 'valid');
    }
  }

  private async buildNewUniqToken(): Promise<String> {
    let session: any = null;
    let newToken: string | undefined = undefined;

    /* eslint-disable no-await-in-loop */
    while (!newToken) {
      const token: string = crypto.randomBytes(64).toString('hex');
      session = await UserSession.findOne({
        where: { userId: this.user!.id, token },
      });

      if (!session) {
        newToken = token;
      }
    }
    /* eslint-disable no-await-in-loop */

    return newToken;
  }

  private async isPasswordValid() {
    if (!this.user || this.requestParams.password === undefined) {
      return false;
    }

    const match = await bcrypt.compare(
      this.requestParams.password,
      this.user.password,
    );

    return match;
  }

  private async setupVariables() {
    await this.setupVariablesUser();
  }

  private async setupVariablesUser() {
    const { email } = this.requestParams;

    if (email === undefined) {
      return;
    }

    this.user = await User.findOne({ where: { email: email } });
  }
}
