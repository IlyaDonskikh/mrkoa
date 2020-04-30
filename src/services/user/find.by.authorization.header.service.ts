import { _ } from 'lodash';
import BaseService from '../base.service';

export default class UserFindByAuthorizationService extends BaseService {
  authorizationHeader: string;

  private token: string | null = null
  public user: any;

  // Etc.
  async process() {
    this.extractTokenFrom(this.authorizationHeader)

    if (!(await this.isValid())) { return; }

    // set user

    return;
  }

  private async validate() {
    if (!this.token) { return this.errors.add('token', 'blank') }
    if (this.token !== process.env.NODE_APP_TOKEN) { this.errors.add('token', 'invalid') }
  }

  private extractTokenFrom(authorizationHeader) {
    if (typeof authorizationHeader !== 'string') { return };

    if (authorizationHeader.startsWith('Bearer ')) {
      this.token = _.replace(authorizationHeader, 'Bearer ', '');
    }
  }
}
