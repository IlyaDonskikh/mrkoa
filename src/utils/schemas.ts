import { JSONSchema6 } from "json-schema";
// @ts-ignore
import * as deref from "json-schema-deref-sync";

// tslint:disable-next-line: no-var-requires
const spec = require(`${__dirname}/../../specs/openapi.json`);

export interface ApiSchema extends JSONSchema6 {
  properties?: {
    [k: string]: ApiSchema;
  };

  anyOf?: ApiSchema[];
  items?: ApiSchema;
}

// hack while '$id' is not in tinyspec
Object.keys(spec.definitions).forEach((id) => {
  spec.definitions[id].$id = id;
});

export const schemas: { [k: string]: ApiSchema } = deref(spec).definitions;
