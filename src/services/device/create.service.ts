import { DbInterface } from '../../typings/db_interface';

export default class ListService {
  readonly defaultPage = 1;

  readonly defaultItemsPerPage = 24;

  db: DbInterface;

  params: any;

  constructor(db: DbInterface, params: any) {
    this.db = db;
    this.params = params;
  }

  async call() {
    const body: object = {};
    const deviceParams = this.params.device;
    let device: object | null;

    if (deviceParams) {
      device = await this.db.Device.create(deviceParams);
      body.device = device;
    }

    const status = 200;

    return { body, status };
  }
}
