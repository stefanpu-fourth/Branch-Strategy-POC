import DS from 'ember-data';

var attr = DS.attr;

var MainEmployment = DS.Model.extend({
  employeeId: attr('number'),
  employmentId: attr('number'),
  jobTitle: attr('string'),
  payType: attr('string'),
  companyName: attr('string'),
  division: attr('string'),
  locationName: attr('string'),
  address1: attr('string'),
  address2: attr('string'),
  address3: attr('string'),
  town: attr('string'),
  county: attr('string'),
  postCode: attr('string'),
  phone: attr('string'),
  fax: attr('string'),
  taxOfficeName: attr('string'),
  taxOfficeNumber: attr('number'),
  payeReference: attr('number')
});


MainEmployment.reopenClass({
  FIXTURES: [{
    id: 1,
    employmentId: 1,
    jobTitle: 'Custom Service Operative',
    companyName: 'Fourth',
    locationName: 'London',
    address1: '90 Long Acre',
    address2: 'Covent Garden',
    town: 'London',
    postCode: 'WC2E 9RA',
    phone: '01234 567 890',
    fax: '01234 567 890'
  }]
});

export default MainEmployment;

