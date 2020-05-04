import { _ } from 'lodash';
import * as jwt from 'jsonwebtoken';
import BaseService from '../base.service';
import { User } from '../../models/user.model';

export default class FindByAuthorizationService extends BaseService {
  authorizationHeader: string;

  private token: string | null = null;

  private currentUser: User | null = null;

  public user: User;

  // Etc.
  async process() {
    this.extractTokenFrom(this.authorizationHeader);

    if (!(await this.isValid())) { return; }

    this.user = this.currentUser;
  }

  private async validate() {
    if (!this.token) { this.errors.add('token', 'blank'); }
    await this.tokenIsValid(); // Validate jwt token and set currentUser
    if (!this.currentUser) { this.errors.add('token', 'user'); }
  }

  private extractTokenFrom(authorizationHeader: string | null) {
    if (typeof authorizationHeader !== 'string') { return; }

    if (authorizationHeader.startsWith('Bearer ')) {
      this.token = _.replace(authorizationHeader, 'Bearer ', '');
    }
  }

  private async tokenIsValid() {
    if (!this.token) { return; }

    try {
      const decoded = jwt.verify(this.token, process.env.NODE_APP_TOKEN);

      this.currentUser = await User.findOne({ where: { token: decoded.userToken } });
    } catch (err) {
      this.errors.add('token', 'invalid');
    }
  }
}
