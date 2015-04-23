import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  startDateFormat: function () {
    return moment(this.get('attrs.employee.startDate')).format('DD MMM YYYY');
  }.property('attrs.employee.startDate'),

  dateOfBirthFormat: function () {
    return moment(this.get('attrs.employee.dateOfBirth')).format('DD MMM YYYY');
  }.property('attrs.employee.dateOfBirth')
});
