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
  town: faker.address.city,
  county: faker.address.county,
  country: faker.address.country,
  postCode: faker.address.zipCode,
  homeTel: faker.phone.phoneNumber,
  mobileTel: faker.phone.phoneNumber,
  workEmail: faker.internet.email,
  homeEmail: faker.internet.email,
  nationalInsuranceNumber: faker.random.number,
  nationality: faker.address.country,
  employeeNumber: faker.random.number,
  startDate: faker.date.past,
  lengthOfService: faker.random.number
});
