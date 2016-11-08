import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  surname: attr('string'),
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
  nationalInsuranceNumber: attr('string'),
  nationality: attr('string'),
  employeeNumber: attr('string'),
  startDate: attr('string'), //TODO: change to date or similar for API integration
  lengthOfService: attr('string'),
  nextOfKins: DS.hasMany('nextOfKins'),

  fullName: function () {
    var props = this.getProperties('firstNames', 'surname');
    return `${props.firstNames} ${props.surname}`;
  }.property('firstNames', 'surname')

});
