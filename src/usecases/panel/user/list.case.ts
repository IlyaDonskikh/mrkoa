import { User } from '../../../models/user.model';
import { UseCase } from '../../../utils/use.case';

interface Request {
  offset: number;
  perPage: number;
}

interface Response {
  body: {
    items: User[];
    itemsTotalCount: number;
  };
}

export class PanelUserListCase extends UseCase<Request, Response>() {
  // process
  async process() {
    const users = await User.findAndCountAll({
      limit: this.request.perPage,
      offset: this.request.offset,
      order: [['created_at', 'DESC']],
    });

    return {
      body: this.buildBodyBy(users),
    };
  }

  // private
  private buildBodyBy(users: { rows: User[]; count: number }) {
    return {
      items: users.rows,
      itemsTotalCount: users.count,
    };
  }
}
