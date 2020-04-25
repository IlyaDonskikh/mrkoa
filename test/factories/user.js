const faker = require('faker');
const models = require('../../dist/models/index').default();

const data = async (props = {}) => {
  const defaultProps = {
    externalId: faker.random.number(),
  };
  return Object.assign({}, defaultProps, props);
};

const create = async (props = {}) => {
  return models.Device.create(await data(props));
}

module.exports = create;
