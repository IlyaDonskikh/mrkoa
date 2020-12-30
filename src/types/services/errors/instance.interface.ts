export default interface InstanceInterface {
  messages: () => void | any;
  add: (name: string, code: string) => void;
  errors: object | any;
}
