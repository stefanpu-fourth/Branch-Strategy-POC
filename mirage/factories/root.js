import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  employeeId(i) { return i; },
  token: faker.random.uuid
});
