import { error } from 'console';

import { ErrorsBuilder } from './errors.builder';
import { validateSchema } from './schema.validator';
import { MrJsonSchema } from './schemas';

export function validate<T>({
  schema,
  data,
}: {
  schema: MrJsonSchema;
  data: object;
}): T | never {
  if (typeof schema.type !== 'string') {
    throw new Error('Invalid JSON Schema');
  }

  try {
    validateSchema(schema, data);
  } catch (err) {
    throwErrors(err);
  }

  return data as unknown as T;
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
    const propertyName = buildPropertyName({ element });

    errorsBuilder.add(propertyName, element.keyword);
  });

  throw errorsBuilder;
}

function buildPropertyName({ element }: { element: any }) {
  const propertyName = element.params.missingProperty || element.instancePath;

  return propertyName.replace(/^\/+|\/+$/gm, '').replace('/', '_');
}
