export interface ErrorsInstanceInterface {
  messages: () => void;
  add: (name, code) => void;
  errors: object;
}

export class ErrorsService {
  public errors: object = {};

  messages() {
    return this.errors; // To structurize, localize and other magic before return into response
  }

  add(name: string, code: string) {
    if (this.errors[name] === undefined) { this.errors[name] = []; }
    if (this.errors[name].includes(code)) { return; }

    this.errors[name].push(code);
  }
}
