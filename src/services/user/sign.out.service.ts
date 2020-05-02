import BaseService from '../base.service';
import { User } from '../../models/user.model';

export default class SignOutService extends BaseService {
  // Attrs
  currentUser: User | null;

  // Etc.
  async process() {
    if (!(await this.isValid())) { return; }

    await this.currentUser.update({ token: null });
  }

  // Private
  private async validate() {
    if (!this.currentUser) { this.errors.add('currentUser', 'presence'); }
  }
}
