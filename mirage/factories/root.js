import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  employeeId: 1,
  token: faker.random.uuid
});
