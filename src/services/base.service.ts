import ErrorsInstanceInterface from '../types/services/errors/instance.interface';
import ErrorsService from './errors.service';

export function BaseService<T>() {
  class BaseService {
    [key: string]: any;

    requestParams: T;

    protected localePath = 'services.base';

    public errors: ErrorsInstanceInterface;

    constructor(params: T) {
      if (typeof params != 'object') {
        throw new Error();
      }

      this.requestParams = params;
    }

    static call(params: T) {
      return new this(params).call();
    }

    async validate() {
      await this.checks();

      if (this.isFailed()) {
        throw this.errors;
      }
    }

    isSuccess() {
      return Object.keys(this.errors.errors).length === 0;
    }

    isFailed() {
      return !this.isSuccess();
    }

    private async call() {
      this.errors = new ErrorsService({ localePath: this.localePath });

      await this.process();

      return this;
    }
  }

  return BaseService;
}
