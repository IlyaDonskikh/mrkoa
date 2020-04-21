import { DbInterface } from '../../typings/db_interface';

export default class ListService {
  readonly defaultPage = 1;

  readonly defaultItemsPerPage = 24;

  page: number;

  db: DbInterface;

  constructor(db: DbInterface, page: number) {
    this.db = db;
    this.page = page || this.defaultPage;
  }

  async call() {
    const devices = await this.db.Device.findAndCountAll({
      limit: this.defaultItemsPerPage,
      offset: this.defaultItemsPerPage * (this.page - 1),
      order: [['created_at', 'DESC']],
    });

    const body = {
      devices: devices.rows,
      page: this.page,
      itemsPerPage: this.defaultItemsPerPage,
      totalPages: Math.ceil(devices.count / (this.defaultItemsPerPage * this.page)),
      totalItems: devices.count,
      time: Date.now(),
    };
    const status = 200;

    return { body, status };
  }
}
