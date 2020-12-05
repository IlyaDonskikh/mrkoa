import * as Ajv from "ajv";
import { JSONSchema6 } from "json-schema";

const validators: { [id: string]: Ajv.ValidateFunction } = {};
const ajv = new Ajv({
  formats: {
    float: { type: "number" },
  },
});

export function validateSchema(schema: JSONSchema6, data: object) {
  if (typeof schema.type !== "string") {
    throw new Error("Invalid JSON Schema");
  }

  const validator = getValidator(schema);
  if (!validator(data)) {
    throw new (Ajv.ValidationError as any)(validator.errors);
  }
}

function getValidator(schema: JSONSchema6) {
  if (!schema.$id) {
    return ajv.compile(schema);
  }
  if (!validators[schema.$id]) {
    validators[schema.$id] = ajv.getSchema(schema.$id) || ajv.compile(schema);
  }
  return validators[schema.$id];
}
