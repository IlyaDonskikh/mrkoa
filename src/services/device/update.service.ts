import { Model } from 'sequelize';
import BaseService from '../base.service';
import { Device } from '../../models/device.model';
import DeviceValidator from '../../validators/panel/device.validator';
import ListServiceBodyInterface from '../../typings/services/device/list_service/body.interface';

export default class UpdateService extends BaseService {
  // Attrs
  id: number;

  attrs: any;

  device: Model;

  validator: any;

  public body: ListServiceBodyInterface = {};

  // Etc.
  async process() {
    this.device = await Device.findByPk(this.id);

    if (!(await this.isValid())) { return; }

    await this.device.update(this.validator.attrs);

    this.body.device = this.device;
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
