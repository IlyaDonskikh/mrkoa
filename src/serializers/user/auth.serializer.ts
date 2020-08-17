import BaseSerializer from '../base.serializer';

export default class UserAuthSerializer extends BaseSerializer {
  protected attributes = [
    'id',
    'email',
    'tokenJWT',
  ];
}
