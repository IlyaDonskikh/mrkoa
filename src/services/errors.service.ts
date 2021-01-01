import { customI18n as I18n } from '../lib/i18n';
import { ErrorsInstanceInterface } from '../types/services/errors/instance.interface';

export class ErrorsService {
  public localePath: string;

  public statusCode: number = 422;
  public errors: { [key: string]: string[] } = {};

  constructor({ localePath }: { localePath: string }) {
    this.localePath = localePath
      .replace(/.*\/src\/(.*)/gm, '$1')
      .replace(/\//g, '.');
  }

  messages() {
    const localizedMessages: { [key: string]: string[] } = {};

    Object.keys(this.errors).forEach((key) => {
      localizedMessages[key] = this.buildLocalePathsBy(key);
    });

    return localizedMessages;
  }

  add(name: string, code: string) {
    if (this.errors[name] === undefined) {
      this.errors[name] = [];
    }
    if (this.errors[name].includes(code)) {
      return;
    }

    this.errors[name].push(code);
  }

  merge(errorsService: ErrorsInstanceInterface) {
    const errorsList = errorsService.errors;

    Object.keys(errorsList).forEach((key: string) => {
      errorsList[key].forEach((errorCode: string) => {
        this.add(key, errorCode);
      });
    });
  }

  private buildLocalePathsBy(key: string): Array<string> {
    return this.errors[key].map((code: string) =>
      I18n.t(`${this.localePath}.${key}.${code}`),
    );
  }
}
