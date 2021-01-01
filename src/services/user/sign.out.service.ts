import { UserSession } from '../../models/user/session.model';
import { BaseService } from '../base.service';

interface RequestParams {
  id: number;
}

export class UserSignOutService extends BaseService<RequestParams>() {
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
      this.errors.add('currentSession', 'presence');
    }
  }

  private async setupVariables() {
    this.session = await UserSession.findByPk(this.requestParams.id);
  }
}
