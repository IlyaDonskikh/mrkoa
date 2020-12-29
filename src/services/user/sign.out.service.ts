import { UserSession } from '../../models/user/session.model';
import { BaseService } from '../base.service';

interface RequestParams {
  id: number;
}

export default class SignOutService extends BaseService<RequestParams>() {
  session: UserSession | null;

  // Etc.
  async process() {
    await this.setupVariables();

    await this.isValid();

    await this.session!.destroy();
  }

  // Private
  protected async validate() {
    if (!this.session) {
      this.errors.add('currentSession', 'presence');
    }
  }

  private async setupVariables() {
    this.session = await UserSession.findByPk(this.requestParams.id);
  }
}
