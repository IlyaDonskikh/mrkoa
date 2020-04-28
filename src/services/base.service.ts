import { ErrorsService } from './errors.service';
import { InstanceInterface as ErrorsInstanceInterface } from '../typings/services/errors/instance.interface';

export default class BaseService {
  [key: string]: any;

  public errors: ErrorsInstanceInterface = new ErrorsService();

  constructor(params: object = {}) {
    Object.entries(params).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  static call(params: object = {}) {
    return new this(params).call();
  }

  async isValid() {
    await this.validate();

    return this.isSuccess();
  }

  isSuccess() {
    return (Object.keys(this.errors.errors).length === 0);
  }

  isFailed() {
    return !this.isSuccess();
  }

  private async call() {
    await this.process();

    return this;
  }
}
