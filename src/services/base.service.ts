export default class BaseService {
  errors: any;

  constructor() {
    this.errors = {}
  }

  isSuccess() {
    return (Object.keys(this.errors).length === 0)
  }
}
