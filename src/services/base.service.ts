import ErrorsService from './errors.service'

export default class BaseService {
  [key: string]: any;

  public errors: object = new ErrorsService();

  constructor(params: object = {}) {
    Object.entries(params).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  static call(params: object = {}) {
    return new this(params).call();
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
