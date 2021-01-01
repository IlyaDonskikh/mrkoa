import { BaseSerializer } from '../base.serializer';

export class SessionDefaultSerializer extends BaseSerializer {
  protected attributes = ['id', 'tokenJWT', 'createdAt', 'updatedAt'];
}
