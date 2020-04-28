import * as faker from 'faker';
import models from '../../dist/models/index';

const data = async (props = {}) => {
  const defaultProps = {
    externalId: faker.random.number(),
  };
  return { ...defaultProps, ...props };
};

const create = async (props = {}) => models().Device.create(await data(props));
const build = async (props = {}) => models().Device.build(await data(props));

export { create, build };
