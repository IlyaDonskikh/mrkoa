import { User } from '../../../models/user.model';
import { UseCase } from '../../../utils/use.case';

interface Request {
  page?: number | null;
}

interface Response {
  body: {
    users: User[];
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
    time: number;
  };
}

export class PanelUserListCase extends UseCase<Request, Response>() {
  // Attrs
  readonly defaultItemsPerPage = 24;

  readonly defaultPage = 1;

  public body: object = {};

  // Etc.
  async process() {
    const page = this.request.page || this.defaultPage;
    const users = await User.findAndCountAll({
      limit: this.defaultItemsPerPage,
      offset: this.defaultItemsPerPage * (page - 1),
      order: [['created_at', 'DESC']],
    });

    this.response = {
      body: this.buildBodyBy(users, page),
    };
  }

  // Private
  private buildBodyBy(users: { rows: User[]; count: number }, page: number) {
    return {
      users: users.rows,
      page,
      itemsPerPage: this.defaultItemsPerPage,
      totalPages: Math.ceil(users.count / (this.defaultItemsPerPage * page)),
      totalItems: users.count,
      time: Date.now(),
    };
  }
}
