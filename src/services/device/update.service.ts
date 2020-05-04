import { Model } from 'sequelize';
import BaseService from '../base.service';
import { Device } from '../../models/device.model';
import DeviceValidator from '../../validators/panel/device.validator';

export default class UpdateService extends BaseService {
  // Attrs
  id: number;

  attrs: any;

  validator: any;

  public device: Device;

  // Etc.
  async process() {
    this.device = await Device.findByPk(this.id);

    if (!(await this.isValid())) { return; }

    this.device = await this.device.update(this.validator.attrs);
  }

  private async validate() {
    if (!this.device) {
      this.errors.add('id', 'find');

      return;
    }

    this.validator = await DeviceValidator.validate(this.errors, this.device, this.attrs);

    this.errors = this.validator.errors;
  }
}
