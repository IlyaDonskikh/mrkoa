import Ajv from 'ajv';
import { AnyValidateFunction } from 'ajv/dist/core';
import { MrJsonSchema } from './schemas';

const validators: { [id: string]: AnyValidateFunction } = {};
const ajv = new Ajv({
  removeAdditional: 'all',
  coerceTypes: true,
});

export function validateSchema(schema: MrJsonSchema, data: object) {
  if (typeof schema.type !== 'string') {
    throw new Error('Invalid JSON Schema');
  }

  const validator = getValidator(schema);

  if (!validator(data)) {
    throw new (Ajv.ValidationError as any)(validator.errors);
  }
}

function getValidator(schema: MrJsonSchema) {
  if (!schema.$id) {
    return ajv.compile(schema);
  }
  if (!validators[schema.$id]) {
    validators[schema.$id] = ajv.getSchema(schema.$id) || ajv.compile(schema);
  }
  return validators[schema.$id];
}
