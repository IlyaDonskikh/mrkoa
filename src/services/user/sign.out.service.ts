import { UserSession } from '../../models/user/session.model';
import BaseService from '../base.service';

export default class SignOutService extends BaseService() {
  // Attrs
  currentSession: UserSession;

  // Etc.
  async process() {
    if (!(await this.isValid())) {
      return;
    }

    await this.currentSession.destroy();
  }

  // Private
  private async validate() {
    if (!this.currentSession) {
      this.errors.add('currentSession', 'presence');
    }
  }
}
