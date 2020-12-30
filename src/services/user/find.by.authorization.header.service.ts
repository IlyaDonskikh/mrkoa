import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import { BaseService } from '../base.service';
import { UserSession } from '../../models/user/session.model';

interface RequestParams {
  authorizationHeader?: string;
}

export default class FindByAuthorizationService extends BaseService<RequestParams>() {
  private token: string | null = null;

  private decodedToken: any;

  public session: UserSession;

  // Etc.
  async process() {
    this.extractTokenFrom(this.requestParams.authorizationHeader);
    this.assignDecodedToken();

    await this.assignSession();

    await this.validate();

    // We already have all data set
  }

  // private

  protected async checks() {
    if (!this.token) this.errors.add('token', 'blank');
    if (!this.decodedToken) this.errors.add('token', 'invalid');
    if (!this.session) this.errors.add('token', 'session');
  }

  private extractTokenFrom(authorizationHeader?: string) {
    if (typeof authorizationHeader !== 'string') return;

    if (authorizationHeader.startsWith('Bearer ')) {
      this.token = _.replace(authorizationHeader, 'Bearer ', '');
    }
  }

  private assignDecodedToken() {
    if (!this.token) {
      return;
    }

    try {
      this.decodedToken = jwt.verify(
        this.token,
        process.env.NODE_APP_TOKEN as string,
      );
    } catch (err) {
      this.decodedToken = null;
    }
  }

  private async assignSession() {
    if (!this.decodedToken || !this.decodedToken?.sessionToken) {
      return;
    }

    this.session = await UserSession.findOne({
      where: { token: this.decodedToken.sessionToken },
      rejectOnEmpty: true,
    });
  }
}
