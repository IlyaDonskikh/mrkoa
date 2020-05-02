import * as bcrypt from 'bcrypt';
import BaseService from '../base.service';

export default class EncryptPasswordService extends BaseService {
  // Attrs
  password: string;

  private readonly saltRounds = 10;

  public encryptedPassword: string;

  // Etc.
  async process() {
    this.encryptedPassword = bcrypt.hashSync(this.password, this.saltRounds);
  }
}
