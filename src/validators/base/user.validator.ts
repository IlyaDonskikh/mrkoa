import * as _ from "lodash";
import { Op } from "sequelize";
import isEmail from "validator/lib/isEmail";
import BaseValidator from "../base.validator";
import { User } from "../../models/user.model";

// The validator used as base for others, please do changes carefully.

export default class UserBaseValidator extends BaseValidator {
  private minPasswordLength = 6;

  protected permittedAttributes: string[] = [
    "firstName",
    "lastName",
    "email",
    "password",
    "passwordConfirmation",
    "phoneNumber",
    "active",
  ];

  async runValidations() {
    const { email, password, passwordConfirmation } = this.mergedAttrs;

    if (!this.modelInstance.id || this.attrs.password) {
      if (typeof password !== "string") {
        this.errors.add("password", "presence");
      }
      if (
        typeof password === "string" &&
        password.length < this.minPasswordLength
      ) {
        this.errors.add("password", "length");
      }
      if (password !== passwordConfirmation) {
        this.errors.add("password", "confirmation");
      }
    }
    if (email === undefined) {
      this.errors.add("email", "presence");
    }
    if (typeof email === "string" && !isEmail(email)) {
      this.errors.add("email", "format");
    }
    const isEmailUniq = await this.isEmailUniq(email);

    if (!isEmailUniq) {
      this.errors.add("email", "uniq");
    }
  }

  private async isEmailUniq(email: string | undefined) {
    if (email === undefined) {
      return true;
    }

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        [Op.not]: { id: this.modelInstance.id },
      },
    });

    return user === null;
  }

  permittedUpdateAttributes() {
    return _.remove(this.permittedAttributes, (n: string) => n !== "email");
  }
}
