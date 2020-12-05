import UserDefaultSerializer from '../../../../serializers/user/default.serializer';
import PanelPrimeUserCreateService from '../../../../services/panel/user/create.service';
import PanelUserListService from '../../../../services/panel/user/list.service';
import { validate } from '../../../../utils/requestValidator';
import { schemas } from '../../../../utils/schemas';

const index = async (ctx: any) => {
  const attrs = {
    page: ctx.request.query.page,
    filters: ctx.request.query.filters,
  };
  const { body } = await PanelUserListService.call(attrs);

  ctx.body = body;
};

const create = async (ctx: any) => {
  const attrs: Api.MrPanelUserCreateRequest = ctx.request.body;
  validate(schemas.MrPanelUserRequest, attrs);

  const service = await PanelPrimeUserCreateService.call(attrs);

  if (service.isSuccess()) {
    ctx.body = {
      user: await UserDefaultSerializer.serialize(service.user),
    };
  } else {
    ctx.body = { errors: service.errors.messages() };
    ctx.status = 422;
  }
};

export { index, create };
