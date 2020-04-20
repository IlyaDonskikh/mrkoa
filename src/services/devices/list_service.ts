export default class ListService {
  readonly defaultPage = 1;

  readonly defaultItemsPerPage = 24;

  page: number;
  db: any;

  constructor(db: any, page: number) {
    this.db = db
    this.page = page || this.defaultPage;
  }

  async call() {
    const devices = await this.db.Device.findAll()

    const body = {
      devices: devices,
      page: this.page,
      itemsPerPage: this.defaultItemsPerPage,
      time: Date.now(),
    };
    const status = 200;

    return { body, status };
  }
}
