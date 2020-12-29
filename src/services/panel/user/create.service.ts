import BaseCreateService from '../../user/create.service';
import PrimePanelUserValidator from '../../../validators/panel/user.validator';

export default class PanelPrimeUserCreateService extends BaseCreateService {
  protected localizationTag = 'services.primePanel.user.createService';

  protected validatorClass = PrimePanelUserValidator; // ToDo: rename to PanelUserValidator and remove base validator
}
