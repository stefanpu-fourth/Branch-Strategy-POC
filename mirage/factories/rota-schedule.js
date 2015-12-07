import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  type() { return 'ON'; },
  shiftDate: faker.date.recent,
  location: faker.address.streetName,
  department: faker.commerce.department,
  jobTitle: faker.name.jobTitle,
  isMain: faker.random.boolean,
  shiftTimes() {
    return [
      '09:00',
      '12:00',
      '14:00',
      '17:00'
    ];
  },
  rotaStart: faker.date.recent,
  rotaStartDayOfWeek() {
    return Math.floor(Math.random() * 7) + 1;
  }
});
