import BaseService from '../base.service';
import { Device } from '../../models/device.model';
import DeviceValidator from '../../validators/panel/device.validator';
import ListServiceBodyInterface from '../../typings/services/device/list_service/body.interface';

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
    this.validator = await DeviceValidator.validate(this.errors, Device.build(), this.attrs);

    this.errors = this.validator.errors
  }
}
