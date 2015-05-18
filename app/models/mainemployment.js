import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  addedToCache: attr('date'),
  employeeId: attr('number'),
  manager: attr('string'),
  jobTitle: attr('string'),
  payType: attr('string'),
  companyName: attr('string'),
  companyAddress1: attr('string'),
  companyAddress2: attr('string'),
  companyAddress3: attr('string'),
  companyTown: attr('string'),
  companyCounty: attr('string'),
  companyPostCode: attr('string'),
  companyPhone: attr('string'),
  companyFax: attr('string'),
  taxOfficeName: attr('string'),
  taxOfficeNumber: attr('number'),
  payeReference: attr('string'),
  locationName: attr('string'),
  locationAddress1: attr('string'),
  locationAddress2: attr('string'),
  locationAddress3: attr('string'),
  locationTown: attr('string'),
  locationCounty: attr('string'),
  locationPostCode: attr('string'),
  locationPhone: attr('string'),
  locationFax: attr('string'),
  division: attr('string')
});
