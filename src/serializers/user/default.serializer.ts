import { BaseSerializer } from '../base.serializer';

export class UserDefaultSerializer extends BaseSerializer {
  protected attributes = ['id', 'email', 'createdAt', 'updatedAt'];
}
