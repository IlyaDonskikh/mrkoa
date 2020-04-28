import BaseService from '../base.service';
import { DbInterface } from '../../typings/db_interface';

interface ListServiceBodyInterface {
  device?: object;
}

export default class ListService extends BaseService {
  // Attrs
  db: DbInterface;
  attrs: any;
  public body: ListServiceBodyInterface = {};

  // Etc.
  async process() {
    if (!(await this.isValid())) { return }

    const device: object = await this.db.Device.create(this.attrs);

    this.body.device = device;
  }

  private async validate() {
    var externalIdUniq;

    if (this.attrs === null) { this.errors.add('attrs', 'format') }
    if (this.attrs.externalId == undefined) { this.errors.add('externalId', 'presence') }

    externalIdUniq = await (this.externalIdUniq())

    if (!externalIdUniq) { this.errors.add('externalId', 'uniq') }
  }

  private async externalIdUniq() {
    const externalId: string = this.attrs.externalId

    if (externalId === undefined) { return true }

    const device = await this.db.Device.findOne({ where: { externalId: String(externalId) } })

    return device === null
  }
}
