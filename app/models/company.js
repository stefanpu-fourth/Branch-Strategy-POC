import DS from 'ember-data';

var attr = DS.attr;

var Company = DS.Model.extend({
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

Company.reopenClass({
  FIXTURES: [
    {
      id: 1,
      companyName: 'Fourth'
    }
  ]
});

export default Company;

