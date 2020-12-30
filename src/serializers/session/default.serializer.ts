import BaseSerializer from '../base.serializer';

export default class SessionDefaultSerializer extends BaseSerializer {
  protected attributes = ['id', 'tokenJWT', 'createdAt', 'updatedAt'];
}
