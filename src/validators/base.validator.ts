import * as _ from 'lodash';
import { MrError } from 'mr-error';

export class BaseValidator {
  [key: string]: any;

  // Attrs.
  public errors: MrError;

  public modelInstance: any;

  public attrs: object | any;

  public mergedAttrs: any;

  // Etc.
  constructor(errors: MrError, modelInstance: any, attrs: object) {
    this.errors = errors;
    this.modelInstance = modelInstance;
    this.attrs = attrs;
  }

  static validate(errors: MrError, modelInstance: any, attrs: object) {
    return new this(errors, modelInstance, attrs).validate();
  }

  async validate() {
    this.sliceAttributes();
    this.buildMergedAttributes();

    await this.runValidations();

    return this;
  }

  private sliceAttributes() {
    this.attrs = _.pick(this.attrs, ...this.buildPermittedAttributes());
  }

  private buildMergedAttributes() {
    this.instanceAttributes = this.modelInstance.toJSON();
    this.mergedAttrs = Object.assign(this.instanceAttributes, this.attrs);
  }

  private buildPermittedAttributes() {
    if (this.modelInstance.id) {
      return this.permittedUpdateAttributes();
    }
    return this.permittedCreateAttributes();
  }

  permittedCreateAttributes() {
    return this.permittedAttributes;
  }

  permittedUpdateAttributes() {
    return this.permittedAttributes;
  }
}
