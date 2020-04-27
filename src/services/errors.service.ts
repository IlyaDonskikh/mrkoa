export default class ErrorsService {
  public errors: object = {};

  static call(params: object = {}) {
    return new this(params).call();
  }

  add(name: string, code: string) {
    if (this.errors[name] == undefined) { this.errors[name] = [] }

    this.errors[name].push(code)
  }
}
