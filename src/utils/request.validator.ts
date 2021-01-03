import { error } from 'console';
import { JSONSchema6 } from 'json-schema';

import { ErrorsBuilder } from './errors.builder';
import { validateSchema } from './schema.validator';

export function validate<T>({
  schema,
  data,
  localePath,
}: {
  schema: JSONSchema6;
  data: object;
  localePath: string;
}): T | never {
  if (typeof schema.type !== 'string') {
    throw new Error('Invalid JSON Schema');
  }

  try {
    validateSchema(schema, data); // ToDo: return all fields errors, not only first one
  } catch (err) {
    throwErrors(err, localePath);
  }

  return (data as unknown) as T;
}

// private

function throwErrors(err: any, localePath: string) {
  if (!err.errors) {
    error('Unexpected Validation Error', { error: err });
    throw new Error('Unexpected Validation Error');
  }

  const errorsBuilder = new ErrorsBuilder({ localePath });

  err.errors.forEach((element: any) => {
    errorsBuilder.add(element.params.missingProperty, element.keyword);
  });

  throw errorsBuilder;
}
