export default class ErrorsService {
  public errors: object = {};

  static call(params: object = {}) {
    return new this(params).call();
  }

  messages() {
    return this.errors // To structurize, localize and other magic before return into response
  }

  add(name: string, code: string) {
    if (this.errors[name] == undefined) { this.errors[name] = [] }

    this.errors[name].push(code)
  }
}
