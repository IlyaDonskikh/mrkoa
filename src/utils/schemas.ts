import { IJsonSchema } from 'openapi-types';
import { convertParametersToJSONSchema } from 'openapi-jsonschema-parameters';
// @ts-ignore
import deref from 'json-schema-deref-sync';

// tslint:disable-next-line: no-var-requires
const spec = require(`${__dirname}/../../specs/openapi.json`);

export interface MrJsonSchema extends IJsonSchema {
  $id: string;
}

interface ApiSchema extends MrJsonSchema {
  properties?: {
    [k: string]: ApiSchema;
  };

  anyOf?: ApiSchema[];
  items?: ApiSchema;
}

// hack for $id

Object.keys(spec.components.schemas).forEach((id) => {
  spec.components.schemas[id].$id = id;
});

const queriesSchema: Record<string, MrJsonSchema> = buildQueriesSchemas({
  spec,
});
const componentsSchemas: { [k: string]: ApiSchema } =
  deref(spec).components.schemas;

export const schemas = { query: queriesSchema, component: componentsSchemas };

// private

function buildQueriesSchemas({ spec }: { spec: any }) {
  const queries: Record<string, MrJsonSchema> = {};

  Object.keys(spec.paths).forEach((path) => {
    const operation = spec.paths[path].get;
    const pathParameters = operation?.parameters;

    if (pathParameters) {
      const operationId = operation.operationId;
      const parameters = convertParametersToJSONSchema(pathParameters);

      if (parameters.query) {
        queries[operationId] = {
          ...parameters.query,
          $id: path,
          type: 'object',
        };
      }
    }
  });

  return queries;
}
