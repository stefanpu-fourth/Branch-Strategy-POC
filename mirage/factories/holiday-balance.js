import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  allowed: faker.random.number,
  booked: faker.random.number,
  taken: faker.random.number,
  accrued: faker.random.number,
  reserved: faker.random.number,
  holidayYearStartDate: faker.date.recent,
  type() { return 'Days'; },
  remaining: faker.random.number
});
