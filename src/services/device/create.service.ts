import { DbInterface } from '../../typings/db_interface';

export default class ListService {
  db: DbInterface;

  attrs: any;
  errors: any;

  constructor(db: DbInterface, attrs: any) {
    this.db = db;
    this.attrs = attrs;
    this.errors = {}
  }

  async call() {
    validate(this)

    const body: object = {};
    let device: object | null;
    let status = 422;

    if isSuccess(this) {
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

  function isSuccess(object) {
    return Object.keys(object.errors).length === 0
  }
}
