export default class BaseService {
  [key: string]: any;

  errors: any;

  constructor(params: object = {}) {
    Object.entries(params).forEach(([key, value]) => {
      this[key] = value;
    });

    this.errors = {};
  }

  static call(params: object = {}) {
    return new this(params).call();
  }

  async call() {
    await this.process();

    return this;
  }

  isSuccess() {
    return (Object.keys(this.errors).length === 0);
  }
}
