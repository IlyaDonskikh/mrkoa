import BaseService from '../base.service';
import { Device } from '../../models/device.model';

interface ListServiceBodyInterface {
  device?: object;
}

export default class CreateService extends BaseService {
  // Attrs
  attrs: any;
  public body: ListServiceBodyInterface = {};

  // Etc.
  async process() {
    if (!(await this.isValid())) { return }

    const device: object = await Device.create(this.attrs);

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

    const device = await Device.findOne({ where: { externalId: String(externalId) } })

    return device === null
  }
}
