import { UserCreateCase } from '../../user/create.case';
import { PanelUserValidator } from '../../../validators/panel/user.validator';

export class PanelUserCreateCase extends UserCreateCase {
  protected localizationTag = 'services.primePanel.user.createService';

  protected validatorClass = PanelUserValidator; // ToDo: rename to PanelUserValidator and remove base validator
}
