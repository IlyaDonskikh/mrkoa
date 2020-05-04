import BaseService from '../base.service';
import { Device } from '../../models/device.model';

export default class ListService extends BaseService {
  // Attrs
  page: number;

  readonly defaultItemsPerPage = 24;

  readonly defaultPage = 1;

  public body: object = {};

  // Etc.
  async process() {
    const page = this.page || this.defaultPage;
    const devices = await Device.findAndCountAll({
      limit: this.defaultItemsPerPage,
      offset: this.defaultItemsPerPage * (page - 1),
      order: [['created_at', 'DESC']],
    });

    this.body = this.buildBodyBy(devices, page);
  }

  private buildBodyBy(devices, page) {
    return {
      devices: devices.rows,
      page,
      itemsPerPage: this.defaultItemsPerPage,
      totalPages: Math.ceil(devices.count / (this.defaultItemsPerPage * page)),
      totalItems: devices.count,
      time: Date.now(),
    };
  }
}
