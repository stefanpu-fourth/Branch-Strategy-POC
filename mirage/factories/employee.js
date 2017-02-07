import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  surname: faker.name.lastName,
  firstNames: faker.name.firstName,
  preferredName: faker.name.firstName,
  dateOfBirth: faker.date.past,
  gender(i) { return i % 2 === 0 ? 'Male' : 'Female'; },
  address1: faker.address.streetAddress,
  address2: faker.address.streetName,
  address3: faker.address.secondaryAddress,
  town: 'string',
  county: faker.address.county,
  country: 'County',
  secondCountry: 'County',
  postCode: 'abc def',
  homeTel: '0123456',
  mobileTel: '0123456',
  workEmail: faker.internet.email,
  homeEmail: faker.internet.email,
  nationalInsuranceNumber: faker.random.number,
  nationality: faker.address.country,
  employeeNumber: faker.random.number,
  startDate: faker.date.past,
  middleName: faker.name.lastName,
  personTitle: 'Mrs',
  lengthOfService: faker.random.number
});
