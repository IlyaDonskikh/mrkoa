import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UseCase } from '../../utils/use.case';
import { User } from '../../models/user.model';
import { UserSession } from '../../models/user/session.model';

interface Request {
  session: {
    email: string;
    password: string;
  };
}

interface Response {
  session: UserSession;
}

export class UserSignInCase extends UseCase<Request, Response>() {
  // Attrs
  private user: User | null;
  private userValidated: User;

  // Etc.
  async process() {
    await this.setupVariables();

    await this.validate();

    return {
      session: await UserSession.create({
        userId: this.userValidated.id,
        token: await this.buildNewUniqToken(),
      }),
    };
  }

  // Private
  protected async checks() {
    if (this.request.session.email === undefined) {
      this.errors.add('password', 'presence');
    }
    if (this.request.session.email === undefined) {
      this.errors.add('email', 'presence');
    }
    if (!(await this.isPasswordValid())) {
      this.errors.add('password', 'valid');
    }
    if (!this.user) {
      this.errors.add('email', 'find', {
        replacements: { email: this.request.session.email },
      });

      return;
    }

    this.userValidated = this.user;
  }

  private async buildNewUniqToken(): Promise<String> {
    let session: any = null;
    let newToken: string | undefined = undefined;

    /* eslint-disable no-await-in-loop */
    while (!newToken) {
      const token: string = crypto.randomBytes(64).toString('hex');
      session = await UserSession.findOne({
        where: { userId: this.userValidated.id, token },
      });

      if (!session) {
        newToken = token;
      }
    }
    /* eslint-disable no-await-in-loop */

    return newToken;
  }

  private async isPasswordValid() {
    if (!this.user || this.request.session.password === undefined) {
      return false;
    }

    const match = await bcrypt.compare(
      this.request.session.password,
      this.user.password,
    );

    return match;
  }

  private async setupVariables() {
    await this.setupVariablesUser();
  }

  private async setupVariablesUser() {
    const { email } = this.request.session;

    if (email === undefined) {
      return;
    }

    this.user = await User.findOne({ where: { email: email } });
  }
}
