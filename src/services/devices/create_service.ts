export default class ListService {
  readonly defaultPage = 1;

  readonly defaultItemsPerPage = 24;

  db: any;
  params: any;

  constructor(db: any, params: any) {
    this.db = db;
    this.params = params;
  }

  async call() {
    console.log(this.params)

    const body = {
      params: this.params.device
    };
    const deviceParams = this.params.device

    if (deviceParams) { this.db.Device.create(deviceParams) }

    const status = 200;

    return { body, status };
  }
}
