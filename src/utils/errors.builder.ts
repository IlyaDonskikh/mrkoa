import { MrError } from 'mr-error';
import { customI18n as I18n } from './i18n';

export class ErrorsBuilder extends MrError {
  localizationPackage = I18n;
}
