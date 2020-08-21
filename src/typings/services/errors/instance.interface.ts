
export default interface InstanceInterface {
  messages: () => void | any;
  add: (name, code) => void;
  errors: object | any;
}
