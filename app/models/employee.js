import DS from 'ember-data';

var attr = DS.attr;

var Employee = DS.Model.extend({
  surName: attr('string'),
  firstNames: attr('string'),
  preferredName: attr('string'),
  dateOfBirth: attr('string'), //TODO: change to date or similar for API integration
  gender: attr('string'),
  address1: attr('string'),
  address2: attr('string'),
  address3: attr('string'),
  town: attr('string'),
  county: attr('string'),
  country: attr('string'),
  postCode: attr('string'),
  homeTel: attr('string'),
  mobileTel: attr('string'),
  workEmail: attr('string'),
  homeEmail: attr('string'),
  NINumber: attr('string'),
  nationality: attr('string'),
  employeeNumber: attr('string'),
  startDate: attr('string'), //TODO: change to date or similar for API integration
  serviceDuration: attr('string')
});

Employee.reopenClass({
  FIXTURES: [
    {
      surName: 'Flintstone',
      firstNames: 'Fred',
      address1: '301 Cobblestone Way',
      address2: 'Bedrock',
      county: 'Louisiana',
      postCode: '70777',
      dateOfBirth: '1000BC',
      homeTel: '01234 567 890',
      mobileTel: '01234 567 890',
      workEmail: 'fred.flintstone@fourth.com'
    }
  ]
});

export default Employee;
