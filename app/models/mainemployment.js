import DS from 'ember-data';

var attr = DS.attr;
var belongsTo = DS.belongsTo;

var MainEmployment = DS.Model.extend({
  employeeId: attr('number'),
  employmentId: attr('number'),
  jobTitle: attr('string'),
  payType: attr('string'),
  company: belongsTo('company'), //will more than likely be embedded always
  location: belongsTo('location')  //will more than likely be embedded always
});

MainEmployment.reopenClass({
  FIXTURES: [{
    id: 1,
    employmentId: 1,
    jobTitle: 'Custom Service Operative',
    company: 1,
    location: 1
  }]
});

export default MainEmployment;

