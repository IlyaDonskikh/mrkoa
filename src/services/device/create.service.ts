import BaseService from '../base.service';
import { DbInterface } from '../../typings/db_interface';

export default class ListService extends BaseService {
  db: DbInterface;

  attrs: any;

  // Return
  body: object = {};

  status: number = 422;

  // Etc.
  async process() {
    validate(this)

    let device: object | null;
    let status = 422;

    if super.isSuccess() {
      device = await this.db.Device.create(this.attrs);

      this.body.device = device;
      this.status = 200
    }
  }

  function validate(object) {
    if (object.attrs === null) { object.errors['attrs'] = ['format'] }
    if (object.attrs.externalId == undefined) { object.errors['externalId'] = ['presence'] }
  }
}
