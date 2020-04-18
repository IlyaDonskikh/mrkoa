export default class ListService {
  readonly defaultPage = 1;

  readonly defaultItemsPerPage = 24;

  page: number;

  constructor(page: number) {
    this.page = page || this.defaultPage;
  }

  async call() {
    const body = {
      devices: [],
      page: this.page,
      itemsPerPage: this.defaultItemsPerPage,
      time: Date.now()
    };
    const status = 200;

    return { body, status };
  }
}
