import BaseService from '../base.service';
import { DbInterface } from '../../typings/db_interface';

export default class ListService extends BaseService {
  db: DbInterface;

  attrs: any;
  errors: any;

  constructor(db: DbInterface, attrs: any) {
    super()

    this.db = db;
    this.attrs = attrs;
  }

  async call() {
    validate(this)

    const body: object = {};
    let device: object | null;
    let status = 422;

    if super.isSuccess() {
      device = await this.db.Device.create(this.attrs);
      body.device = device;
      status = 200
    }

    return { body, status };
  }

  function validate(object) {
    if (object.attrs === null) { object.errors['attrs'] = ['format'] }
    if (object.attrs.externalId == undefined) { object.errors['externalId'] = ['presence'] }
  }
}
