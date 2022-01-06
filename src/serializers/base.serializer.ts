import { Model } from 'sequelize/dist';

export class BaseSerializer {
  object: any;

  protected attributes: Array<string | (() => any)> = [];

  constructor(object: Model) {
    this.object = object;
  }

  static serialize(object: Model) {
    return new this(object).serialize();
  }

  static async serializeCollection(objects: Array<Model>) {
    const serializedObjects: Array<Model> = [];

    // Keep order is important
    for (let i = 0; i < objects.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      serializedObjects.push(await this.serialize(objects[i]));
    }

    return serializedObjects;
  }

  async serialize() {
    const serializedObject: any = {};

    const promises = this.attributes.map(async (attr: string | (() => any)) => {
      if (typeof attr === 'function') {
        serializedObject[attr.name] = await attr.bind(this).call(null);
      } else {
        serializedObject[attr] = this.object[attr];
      }
    });

    await Promise.all(promises);

    return serializedObject;
  }
}
