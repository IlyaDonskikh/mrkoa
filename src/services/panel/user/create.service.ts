import BaseCreateService from '../../user/create.service';
import PrimePanelUserValidator from '../../../validators/panel/user.validator';

export default class PanelPrimeUserCreateService extends BaseCreateService {
  private localizationTag = 'services.primePanel.user.createService'; // ToDo: Add localization

  protected validatorClass = PrimePanelUserValidator;
}
