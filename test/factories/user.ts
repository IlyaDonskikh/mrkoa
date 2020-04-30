import * as faker from 'faker';
import { Device } from '../../dist/models/device.model';

const data = async (props = {}) => {
  const defaultProps = {
    externalId: faker.random.number(),
  };
  return { ...defaultProps, ...props };
};

const create = async (props = {}) => Device.create(await data(props));
const build = async (props = {}) => Device.build(await data(props));

export { create, build };
