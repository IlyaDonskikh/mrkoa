import BaseService from '../base.service';
import { Device } from '../../models/device.model';
import DeviceValidator from '../../validators/panel/device.validator';

export default class CreateService extends BaseService {
  // Attrs
  attrs: any;

  private validator: any;

  public device: Device;

  // Etc.
  async process() {
    if (!(await this.isValid())) { return; }

    this.device = await Device.create(this.validator.attrs);
  }

  private async validate() {
    this.validator = await DeviceValidator.validate(this.errors, Device.build(), this.attrs);

    this.errors = this.validator.errors;
  }
}
