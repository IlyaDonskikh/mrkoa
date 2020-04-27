import BaseService from '../base.service';
import { DbInterface } from '../../typings/db_interface';

export default class ListService extends BaseService {
  // Attrs
  db: DbInterface;
  page: number;
  readonly defaultItemsPerPage = 24;
  readonly defaultPage = 1;
  public body: object = {};

  // Etc.
  async process() {
    const page = this.page || this.defaultPage
    const devices = await this.db.Device.findAndCountAll({
      limit: this.defaultItemsPerPage,
      offset: this.defaultItemsPerPage * (page - 1),
      order: [['created_at', 'DESC']],
    });

    this.body = this.buildBodyBy(devices, page);
  }

  private buildBodyBy(devices, page) {
    return {
      devices: devices.rows,
      page: page,
      itemsPerPage: this.defaultItemsPerPage,
      totalPages: Math.ceil(devices.count / (this.defaultItemsPerPage * page)),
      totalItems: devices.count,
      time: Date.now(),
    }
  }
}
