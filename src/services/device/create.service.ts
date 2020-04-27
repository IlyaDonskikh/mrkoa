import BaseService from '../base.service';
import { DbInterface } from '../../typings/db_interface';

export default class ListService extends BaseService {
  // Attrs
  db: DbInterface;
  attrs: any;
  public body: object = {};

  // Etc.
  async process() {
    this.validate()

    let device: object | null;
    let status = 422;

    if (super.isSuccess()) {
      device = await this.db.Device.create(this.attrs);

      this.body.device = device;
      this.status = 200
    }
  }

  validate() {
    if (this.attrs === null) { this.errors.add('attrs', 'format') }
    if (this.attrs.externalId == undefined) { this.errors.add('externalId', 'presence') }
  }
}
