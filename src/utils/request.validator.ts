import { error } from 'console';
import { JSONSchema6 } from 'json-schema';

import { ErrorsBuilder } from './errors.builder';
import { validateSchema } from './schema.validator';

export function validate<T>({
  schema,
  data,
}: {
  schema: JSONSchema6;
  data: object;
}): T | never {
  if (typeof schema.type !== 'string') {
    throw new Error('Invalid JSON Schema');
  }

  try {
    validateSchema(schema, data); // ToDo: return all fields errors, not only first one
  } catch (err) {
    throwErrors(err);
  }

  return (data as unknown) as T;
}

// private

function throwErrors(err: any) {
  if (!err.errors) {
    error('Unexpected Validation Error', { error: err });
    throw new Error('Unexpected Validation Error');
  }

  const localePath = 'utils.requestValidator';

  const errorsBuilder = new ErrorsBuilder({ localePath });

  err.errors.forEach((element: any) => {
    errorsBuilder.add(element.params.missingProperty, element.keyword);
  });

  throw errorsBuilder;
}
