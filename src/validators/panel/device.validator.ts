import { _ } from 'lodash';
import BaseValidator from '../base.validator';
import { Device } from '../../models/device.model';
import { Op } from 'sequelize';

export default class PanelDeviceValidator extends BaseValidator {
  private permittedAttributes: string[] = ['externalId', 'externalData'];

  async runValidations() {
    const externalData = this.mergedAttrs.externalData

    if (this.mergedAttrs === null) { this.errors.add('attrs', 'format'); }
    if (this.mergedAttrs.externalId === undefined) { this.errors.add('externalId', 'presence'); }
    if (externalData !== undefined && typeof externalData !== 'object' ) {
      this.errors.add('externalData', 'format');
    }

    const externalIdUniq = await (this.externalIdUniq());

    if (!externalIdUniq) { this.errors.add('externalId', 'uniq'); }
  }

  private async externalIdUniq() {
    const { externalId } = this.mergedAttrs;

    if (externalId === undefined) { return true; }

    const device = await Device.findOne({
      where: {
        externalId: String(externalId),
        [Op.not]: { id: this.modelInstance.id },
      },
    });

    return device === null;
  }

  permittedUpdateAttributes() {
    return _.remove(this.permittedAttributes, function(n) {
      return n !== 'externalId';
    });
  }
}
