import { _ } from 'lodash';
import BaseService from '../base.service';
import { DeviceEvent } from '../../models/device/event.model';

export default class ListService extends BaseService {
  // Attrs
  private validFilters: Array<string> = ['filterByDeviceId'];

  page: number;

  filters: any;

  readonly defaultItemsPerPage = 24;

  readonly defaultPage = 1;

  public body: object = {};

  // Etc.
  async process() {
    const page = this.page || this.defaultPage;
    let queryObject = DeviceEvent;

    queryObject = this.filter(this.filters, queryObject);

    const deviceEvents = await queryObject.findAndCountAll({
      limit: this.defaultItemsPerPage,
      offset: this.defaultItemsPerPage * (page - 1),
      order: [['created_at', 'DESC']],
    });

    this.body = this.buildBodyBy(deviceEvents, page);
  }

  private filter(filters, queryObject) {
    if (typeof filters !== 'object') { return queryObject; }

    const validFilters = _.pick(filters, ...this.validFilters);
    let scopedQueryObject = queryObject;

    Object.entries(validFilters).forEach(([key, value]) => {
      scopedQueryObject = scopedQueryObject.scope({ method: [key, value] });
    });

    return scopedQueryObject;
  }

  private buildBodyBy(deviceEvents, page) {
    return {
      deviceEvents: deviceEvents.rows,
      page,
      itemsPerPage: this.defaultItemsPerPage,
      totalPages: Math.ceil(deviceEvents.count / (this.defaultItemsPerPage * page)),
      totalItems: deviceEvents.count,
      time: Date.now(),
    };
  }
}
