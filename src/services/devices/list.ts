export default class TodoService {
  readonly defaultPage = 1;

  readonly defaultItemsPerPage = 24;

  page: number;

  constructor(page: number) {
    this.page = page || this.defaultPage;
  }

  async call() {
    const body = {
      devices: [],
      time: Date.now(),
      page: this.page,
      itemsPerPage: this.defaultItemsPerPage,
    };
    const status = 200;

    return {
      body,
      status,
    };
  }
}
