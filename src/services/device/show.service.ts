import BaseService from '../base.service';
import { Device } from '../../models/device.model';

export default class ShowService extends BaseService {
  // Attrs
  id: number;
  public body: object | undefined = {};
  public notFound: boolean = true;

  // Etc.
  async process() {
    const device = await Device.findByPk(this.id);

    if (device) {
      this.notFound = false
      this.body = { device: device, time: Date.now() };
    }
  }
}
