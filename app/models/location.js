import DS from 'ember-data';

var attr = DS.attr;

var Location =  DS.Model.extend({
  locationName: attr('string'),
  address1: attr('string'),
  address2: attr('string'),
  address3: attr('string'),
  town: attr('string'),
  county: attr('string'),
  postCode: attr('string'),
  phone: attr('string'),
  fax: attr('string'),
  division: attr('number')
});

Location.reopenClass({
  FIXTURES: [
    {
      id: 1,
      locationName: 'London',
      address1: '90 Long Acre',
      address2: 'Covent Garden',
      town: 'London',
      postCode: 'WC2E 9RA',
      phone: '01234 567 890',
      fax: '01234 567 890'
    }
  ]
});

export default Location;
