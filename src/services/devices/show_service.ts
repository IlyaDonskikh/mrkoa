import { DbInterface } from '../../typings/db_interface';

export default class ShowService {
  db: DbInterface;

  id: number;

  constructor(db: DbInterface, id: number) {
    this.db = db;
    this.id = id;
  }

  async call() {
    const device = await this.db.Device.findByPk(this.id);
    let body: object | null;
    let status: number = 404; ;

    if (device) {
      body = { device, time: Date.now() };
      status = 200;
    }

    return { body, status };
  }
}
