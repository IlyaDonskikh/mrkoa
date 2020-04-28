import BaseValidator from '../base.validator';
import { Device } from '../../models/device.model';

export default class PanelDeviceValidator extends BaseValidator {
  private permittedAttributes: string[] = ['externalId']

  async runValidations() {
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
