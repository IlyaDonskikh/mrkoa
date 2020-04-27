import BaseService from '../base.service';
import { DbInterface } from '../../typings/db_interface';

export default class ListService extends BaseService {
  // Attrs
  db: DbInterface;
  page: number;
  public body: object = {};
  public status: number = 422;
  readonly defaultItemsPerPage = 24;
  readonly defaultPage = 1;

  // Etc.
  async process() {
    const page = this.page || this.defaultPage
    const devices = await this.db.Device.findAndCountAll({
      limit: this.defaultItemsPerPage,
      offset: this.defaultItemsPerPage * (page - 1),
      order: [['created_at', 'DESC']],
    });

    // return
    this.body = this.buildBodyBy(devices, page);
    this.status = 200;
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
