import { UserSession } from '../../models/user/session.model';
import { BaseCase } from '../base.case';

interface RequestParams {
  id: number;
}

export class UserSignOutCase extends BaseCase<RequestParams, null>() {
  session: UserSession | null;

  // Etc.
  async process() {
    await this.setupVariables();

    await this.validate();

    await this.session!.destroy();
  }

  // Private

  protected async checks() {
    if (!this.session) {
      this.errors.add('id', 'find');
    }
  }

  private async setupVariables() {
    this.session = await UserSession.findByPk(this.requestParams.id);
  }
}
