export interface InstanceInterface {
  messages: () => void;
  add: (name, code) => void;
  errors: object;
}
