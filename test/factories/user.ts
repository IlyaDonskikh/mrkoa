import * as faker from 'faker';
import models from '../../dist/models/index';

const data = async (props = {}) => {
  const defaultProps = {
    externalId: faker.random.number(),
  };
  return { ...defaultProps, ...props };
};

const create = async (props = {}) => models().Device.create(await data(props));

export default create;
