import * as Ajv from "ajv";
import { error } from "console";
import { JSONSchema6 } from "json-schema";

import { validateSchema } from "./schemaValidator";

export function validate(schema: JSONSchema6, data: object): void | never {
  if (typeof schema.type !== "string") {
    throw new Error("Invalid JSON Schema");
  }

  try {
    validateSchema(schema, data);
  } catch (err) {
    if (!err.errors) {
      error("Unexpected Validation Error", { error: err, schema, data });
      throw "lol";
    }
    const message = err.errors.map((e: any) => e.message).join(", ");
    const fields = buildFieldErrors(err.errors);

    throw "message / fields";
  }
}

// private

function buildFieldErrors(
  errors: Ajv.ErrorObject[]
): Api.InvalidField[] | undefined {
  const fieldErrors = errors
    .map((error) => convertAjvErrorToFieldError(error))
    .filter(Boolean) as Api.InvalidField[];
  return fieldErrors.length ? fieldErrors : undefined;
}

function convertAjvErrorToFieldError(
  error: Ajv.ErrorObject
): Api.InvalidField | null {
  const { dataPath, keyword, message, params } = error;

  if (keyword === "required") {
    return {
      name: (params as Ajv.RequiredParams).missingProperty,
      message: "is required",
    };
  }

  if (keyword === "additionalProperties") {
    return {
      name: (params as Ajv.AdditionalPropertiesParams).additionalProperty,
      message: "is not allowed",
    };
  }

  const name = dataPath.replace(/^\./, "");
  if (name) {
    return {
      name,
      message: message || "unknown error",
    };
  }
  return null;
}
