export default class BaseSerializer {
  object: any;

  protected attributes: Array<String | Function> = [];

  constructor(object: object = {}) {
    this.object = object;
  }

  static serialize(object: object = {}) {
    return new this(object).serialize();
  }

  static async serializeCollection(objects: Array<object>) {
    const serializedObjects: Array<object> = [];

    // Keep order is important
    for (let i = 0; i < objects.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      serializedObjects.push(await this.serialize(objects[i]));
    }

    return serializedObjects;
  }

  async serialize() {
    const serializedObject: any = {};

    const promises = this.attributes.map(async (attr: string | Function) => {
      if (typeof attr === 'function') {
        serializedObject[attr.name] = await attr.bind(this).call();
      } else {
        serializedObject[attr] = this.object[attr];
      }
    });

    await Promise.all(promises);

    return serializedObject;
  }
}
