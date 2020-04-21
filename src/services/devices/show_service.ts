import { DbInterface } from '../../typings/db_interface';

export default class ShowService {
  db: DbInterface;

  id: number;

  constructor(db: DbInterface, id: number) {
    this.db = db;
    this.id = id;
  }

  async call() {
    console.log(this.id)
    const device = await this.db.Device.findByPk(this.id);
    var body: object | null;
    var status: number;

    if (device) {
      body = {
        device: device,
        time: Date.now(),
      };
      status = 200;
    } else {
      status = 404;
    }

    return { body, status };
  }
}
