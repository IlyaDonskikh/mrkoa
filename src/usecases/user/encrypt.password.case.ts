import * as bcrypt from 'bcrypt';
import { BaseCase } from '../base.case';

interface RequestParams {
  password: string;
}

// ToDo: Move to utils
export class UserEncryptPasswordCase extends BaseCase<RequestParams>() {
  // Attrs
  private readonly saltRounds = 10;

  public encryptedPassword: string;

  // Etc.
  async process() {
    this.encryptedPassword = bcrypt.hashSync(
      this.requestParams.password,
      this.saltRounds,
    );
  }
}
