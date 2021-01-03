import { ErrorsInstanceInterface } from '../types/services/errors/instance.interface';
import { ErrorsBuilder } from '../utils/errors.builder';

export function BaseService<T>() {
  class BaseService {
    [key: string]: any;

    requestParams: T;

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

    // private

    private async call() {
      this.errors = new ErrorsBuilder({ localePath: this.buildLocalePath() });

      await this.process();

      return this;
    }

    private buildLocalePath() {
      const className = this.constructor.name;
      const formattedClassName =
        className[0].toLowerCase() + className.slice(1);

      return `useCases.${formattedClassName}`;
    }
  }

  return BaseService;
}
