import BaseService from '../base.service';
import { DbInterface } from '../../typings/db_interface';

export default class ShowService extends BaseService {
  // Attrs
  db: DbInterface;
  id: number;
  public body: object | undefined = {};
  public notFound: boolean = true;

  // Etc.
  async process() {
    const device = await this.db.Device.findByPk(this.id);

    if (device) {
      this.notFound = false
      this.body = { device: device, time: Date.now() };
    }
  }
}
