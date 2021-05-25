import { MrUseCase } from 'mr-use-case';
import { ErrorsBuilder } from './errors.builder';

export function UseCase<T extends object | null, R extends object | null>() {
  return MrUseCase<T, R>({ errorsBuilder: ErrorsBuilder });
}
