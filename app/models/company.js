import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  companyName: attr('string'),
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
