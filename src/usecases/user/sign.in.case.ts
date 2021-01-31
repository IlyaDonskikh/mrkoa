import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UseCase } from '../../utils/use.case';
import { User } from '../../models/user.model';
import { UserSession } from '../../models/user/session.model';

interface Request {
  email: string;
  password: string;
}

interface Response {
  session: UserSession;
}

export class UserSignInCase extends UseCase<Request, Response>() {
  // Attrs
  private user: User | null = null;

  // Etc.
  async process() {
    await this.setupVariables();

    await this.validate();

    this.response = {
      session: await UserSession.create({
        userId: this.user!.id,
        token: await this.buildNewUniqToken(),
      }),
    };
  }

  // Private
  protected async checks() {
    if (this.request.email === undefined) {
      this.errors.add('password', 'presence');
    }
    if (this.request.email === undefined) {
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
    if (!this.user || this.request.password === undefined) {
      return false;
    }

    const match = await bcrypt.compare(
      this.request.password,
      this.user.password,
    );

    return match;
  }

  private async setupVariables() {
    await this.setupVariablesUser();
  }

  private async setupVariablesUser() {
    const { email } = this.request;

    if (email === undefined) {
      return;
    }

    this.user = await User.findOne({ where: { email: email } });
  }
}
