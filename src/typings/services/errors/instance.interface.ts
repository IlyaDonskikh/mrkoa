
export default interface InstanceInterface {
  messages: () => void;
  add: (name, code) => void;
  errors: object;
}
