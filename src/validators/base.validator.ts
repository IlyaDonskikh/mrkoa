import ErrorsInstanceInterface from '../typings/services/errors/instance.interface';
import { _ } from 'lodash';

export default class BaseValidator {
  [key: string]: any;

  public errors: ErrorsInstanceInterface;
  public modelInstance: any;
  public attrs: object;

  constructor(errors: ErrorsInstanceInterface, modelInstance: any, attrs: object) {
    this.errors = errors;
    this.modelInstance = modelInstance;
    this.attrs = attrs;
  }

  static validate(errors: ErrorsInstanceInterface, modelInstance: any, attrs: object) {
    return new this(errors, modelInstance, attrs).validate();
  }

  async validate() {
    this.sliceAttributes()
    await this.runValidations()

    return this.errors;
  }

  private sliceAttributes() {
    this.instanceAttributes = this.modelInstance.toJSON()
    this.attrs = Object.assign(this.instanceAttributes, this.attrs);
    this.attrs = _.pick(this.attrs, ...this.permittedAttributes)
  }
}
