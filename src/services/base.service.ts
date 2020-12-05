import { setFlagsFromString } from 'v8';
import ErrorsInstanceInterface from '../typings/services/errors/instance.interface';
import ErrorsService from './errors.service';

export default function BaseService<T = {}>() {
  class BaseService {
    [key: string]: any;

    requestParams: T;

    protected localePath = 'services.base';

    public errors: ErrorsInstanceInterface;

    constructor(params: T) {
      this.requestParams = params;
    }

    static call(params: T) {
      return new this(params).call();
    }

    async isValid() {
      await this.validate();

      return this.isSuccess();
    }

    isSuccess() {
      return Object.keys(this.errors.errors).length === 0;
    }

    isFailed() {
      return !this.isSuccess();
    }

    private async call() {
      this.errors = new ErrorsService(this.localePath);

      await this.process();

      return this;
    }
  }

  return BaseService;
}
