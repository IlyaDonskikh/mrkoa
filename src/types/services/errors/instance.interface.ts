export interface ErrorsInstanceInterface {
  messages: () => void | any;
  add: (name: string, code: string) => void;
  errors: object | any;
}
