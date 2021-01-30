import { ErrorBuilder } from '../utils/errors.builder';

export function BaseCase<T, R>() {
  class BaseCase {
    [key: string]: any;

    request: T;
    response: R;
    errors: ErrorBuilder;

    constructor(params: T) {
      if (typeof params != 'object') {
        throw new Error();
      }

      this.request = params;
    }

    static call(params: T) {
      const instance = new this(params).call();

      return instance;
    }

    // private

    protected async validate() {
      await this.checks();

      if (!this.isValid()) {
        throw this.errors;
      }
    }

    private async call() {
      this.errors = new ErrorBuilder({ localePath: this.buildLocalePath() });

      await this.process();

      return this.response;
    }

    private buildLocalePath() {
      const className = this.constructor.name;
      const formattedClassName =
        className[0].toLowerCase() + className.slice(1);

      return `useCases.${formattedClassName}`;
    }

    private isValid() {
      return Object.keys(this.errors.errors).length === 0;
    }
  }

  return BaseCase;
}
