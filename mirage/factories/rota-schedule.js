import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  type() { return 'ON'; },
  shiftDate: faker.data.recent,
  location: faker.address.streetName,
  department: faker.commerce.department,
  jobTitle: faker.name.jobTitle,
  isMain: faker.random.boolean,
  shiftTimes() {
    return [
      '00:00',
      '00:00',
      '00:00',
      '00:00'
    ];
  },
  rotaStart: faker.data.recent,
  rotaStartDayOfWeek() {
    return Math.floor(Math.random() * 7) + 1;
  }
});
