import BaseService from '../../base.service';
import { User } from '../../../models/user.model';

export default class PanelUserListService extends BaseService() {
  // Attrs
  page: number;

  readonly defaultItemsPerPage = 24;

  readonly defaultPage = 1;

  public body: object = {};

  // Etc.
  async process() {
    const page = this.page || this.defaultPage;
    const users = await User.findAndCountAll({
      limit: this.defaultItemsPerPage,
      offset: this.defaultItemsPerPage * (page - 1),
      order: [['created_at', 'DESC']],
    });

    this.body = this.buildBodyBy(users, page);
  }

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
