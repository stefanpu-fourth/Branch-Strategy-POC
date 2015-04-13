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
  niNumber: attr('string'),
  nationality: attr('string'),
  employeeNumber: attr('string'),
  startDate: attr('string'), //TODO: change to date or similar for API integration
  serviceDuration: attr('string'),

  fullName: function () {
    var props = this.getProperties('firstNames', 'surName');
    return `${props.firstNames} ${props.surName}`;
  }.property('firstNames', 'surName')

});

Employee.reopenClass({
  FIXTURES: [
    {
      id: 1,
      surName: 'Flintstone',
      firstNames: 'Fred',
      employeeNumber: '000001',
      startDate: '730BC',
      serviceDuration: '2 years',
      niNumber: 'SN000001B',
      nationality: 'RockLander',
      gender: 'Male',
      address1: '301 Cobblestone Way',
      address2: 'Bedrock',
      address3: 'RockLand',
      town: 'CityStone',
      county: 'Louisiana',
      country: 'United States',
      postCode: '70777',
      dateOfBirth: '1000BC',
      homeTel: '01234 567 890',
      mobileTel: '01234 567 890',
      workEmail: 'fred.flintstone@fourth.com',
      homeEmail: 'fred.flintstone@rock.com'
    }
  ]
});

export default Employee;
