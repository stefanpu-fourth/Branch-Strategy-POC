import Mirage, { faker } from 'ember-cli-mirage';

function shiftDate(i) {
  if (i < 5) {
    return moment().subtract(i, 'day').startOf('day').toDate();
  }

  return moment().add(i, 'day').startOf('day').toDate();
}

export default Mirage.Factory.extend({
  shiftDate,
  type() { return 'ON'; },
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
  rotaStart(i) {
    return moment(shiftDate(i)).startOf('week').toDate();
  },
  rotaStartDayOfWeek() {
    return 2;
  }
});
