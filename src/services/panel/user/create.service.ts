import { UserCreateService } from '../../user/create.service';
import { PrimePanelUserValidator } from '../../../validators/panel/user.validator';

export class PanelUserCreateService extends UserCreateService {
  protected localizationTag = 'services.primePanel.user.createService';

  protected validatorClass = PrimePanelUserValidator; // ToDo: rename to PanelUserValidator and remove base validator
}
