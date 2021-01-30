import { MrError } from 'mr-error';
import { customI18n as I18n } from './i18n';

export class ErrorBuilder extends MrError {
  localizationPackage = I18n;
}
