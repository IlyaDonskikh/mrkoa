import { MrUseCase } from 'mr-use-case';
import { ErrorsBuilder } from './errors.builder';

export function UseCase<T, R>() {
  return MrUseCase<T, R>({ errorsBuilder: ErrorsBuilder });
}
