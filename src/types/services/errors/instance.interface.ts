export default interface InstanceInterface {
  messages: () => void | any;
  add: (name: string, code: string) => void;
  changeStatusCode: (code: number) => void;
  errors: object | any;
}
