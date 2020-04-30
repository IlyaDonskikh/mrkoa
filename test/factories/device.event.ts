import * as faker from 'faker';
import { DeviceEvent } from '../../dist/models/device/event.model';

const data = async (props = {}) => {
  const defaultProps = {
    name: DeviceEvent.availableNames[0],
    value: faker.random.number(),
    initiatedAt: Date.now(),
  };

  return { ...defaultProps, ...props };
};

const create = async (props = {}) => DeviceEvent.create(await data(props));
const build = async (props = {}) => DeviceEvent.build(await data(props));

export { create, build };
