import ErrorsService from "./errors.service";
import ErrorsInstanceInterface from "../typings/services/errors/instance.interface";

export default function BaseService<T = {}>() {
  class BaseService {
    [key: string]: any;

    requestParams: T;

    protected localePath = "services.base";

    public errors: ErrorsInstanceInterface;

    constructor(params: T) {
      this.requestParams = params;

      Object.entries(params).forEach(([key, value]) => {
        this[key] = value;
      });
    }

    static call(params: T) {
      return new this(params).call();
    }
  }

  return BaseService;
}
