import { _ } from 'lodash';
import ErrorsInstanceInterface from '../typings/services/errors/instance.interface';

export default class BaseValidator {
  [key: string]: any;

  // Attrs.
  public errors: ErrorsInstanceInterface;

  public modelInstance: any;

  public attrs: object;

  // Etc.
  constructor(errors: ErrorsInstanceInterface, modelInstance: any, attrs: object) {
    this.errors = errors;
    this.modelInstance = modelInstance;
    this.attrs = attrs;
  }

  static validate(errors: ErrorsInstanceInterface, modelInstance: any, attrs: object) {
    return new this(errors, modelInstance, attrs).validate();
  }

  async validate() {
    this.sliceAttributes();
    await this.runValidations();

    return this;
  }

  private sliceAttributes() {
    this.instanceAttributes = this.modelInstance.toJSON();
    this.attrs = _.pick(this.attrs, this.buildPermittedAttributes());
    this.attrs = Object.assign(this.instanceAttributes, this.attrs);
  }

  private buildPermittedAttributes() {
    if (this.modelInstance.id) {
      return this.permittedUpdateAttributes();
    } else {
      return this.permittedCreateAttributes();
    }
  }

  private permittedCreateAttributes() {
    return this.permittedAttributes;
  }

  private permittedUpdateAttributes() {
    return this.permittedAttributes;
  }
}
