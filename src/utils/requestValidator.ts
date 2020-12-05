import * as Koa from 'koa';
import * as Ajv from 'ajv';
import { error } from 'console';
import { JSONSchema6 } from 'json-schema';

import ErrorsService from '../services/errors.service';
import { validateSchema } from './schemaValidator';
import { nextTick } from 'process';

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
    if (!err.errors) {
      error('Unexpected Validation Error', { error: err, schema, data });
      throw new Error('Unexpected Validation Error');
    }

    const errorsService = new ErrorsService(localePath);

    err.errors.forEach((element: any) => {
      errorsService.add(element.params.missingProperty, element.keyword);
    });

    throw errorsService;
  }

  return (data as unknown) as T;
}

// private

function buildFieldErrors(
  errors: Ajv.ErrorObject[],
): Api.InvalidField[] | undefined {
  const fieldErrors = errors
    .map((error) => convertAjvErrorToFieldError(error))
    .filter(Boolean) as Api.InvalidField[];
  return fieldErrors.length ? fieldErrors : undefined;
}

function convertAjvErrorToFieldError(
  error: Ajv.ErrorObject,
): Api.InvalidField | null {
  const { dataPath, keyword, message, params } = error;

  if (keyword === 'required') {
    return {
      name: (params as Ajv.RequiredParams).missingProperty,
      message: 'is required',
    };
  }

  if (keyword === 'additionalProperties') {
    return {
      name: (params as Ajv.AdditionalPropertiesParams).additionalProperty,
      message: 'is not allowed',
    };
  }

  const name = dataPath.replace(/^\./, '');
  if (name) {
    return {
      name,
      message: message || 'unknown error',
    };
  }
  return null;
}
