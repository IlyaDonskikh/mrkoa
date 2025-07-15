import { UserSession } from '../../../models/user/session.model';
import { UseCase } from '../../../utils/use.case';

interface Request {
  uuid: string;
}

export class AuthSessionDestroyCase extends UseCase<Request, null>() {
  // attrs
  session: UserSession | null;
  sessionValidated: UserSession;

  // process
  async process() {
    await this.setupVariables();

    await this.validate();

    await this.sessionValidated.destroy();
  }

  // private
  protected async checks() {
    if (!this.session) {
      this.errors.add('uuid', 'find');

      return;
    }

    this.sessionValidated = this.session;
  }

  private async setupVariables() {
    this.session = await UserSession.findByPk(this.request.uuid);
  }
}
