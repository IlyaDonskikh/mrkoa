import * as bcrypt from 'bcrypt';
import BaseService from '../base.service';

interface RequestParams {
  password: string;
}
export default class EncryptPasswordService extends BaseService<RequestParams>() {
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
