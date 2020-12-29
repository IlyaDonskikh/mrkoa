import BaseSerializer from '../base.serializer';

export default class UserDefaultSerializer extends BaseSerializer {
  protected attributes = ['id', 'email', 'createdAt', 'updatedAt'];
}
