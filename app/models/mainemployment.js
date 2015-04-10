import DS from 'ember-data';

var attr = DS.attr;

var MainEmployment = DS.Model.extend({
  employeeId: attr('number'),
  employmentId: attr('number'),
  jobTitle: attr('string'),
  payType: attr('string'),
  company: DS.belongsTo('company', { embedded: 'always' }),
  location: DS.belongsTo('location', { embedded: 'always' })
});

MainEmployment.reopenClass({
  FIXTURES: [{
    id: 1,
    employmentId: 1,
    jobTitle: 'Custom Service Operative',
    company: {
      companyName: 'Fourth'
    },
    location: {
      locationName: 'London',
      address1: '90 Long Acre',
      address2: 'Covent Garden',
      town: 'London',
      postCode: 'WC2E 9RA',
      phone: '01234 567 890',
      fax: '01234 567 890'
    }
  }]
});

export default MainEmployment;

