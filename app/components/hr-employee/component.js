import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',
  classNames: ['hr-employee'],

  startDateFormat: function () {
    return moment(this.get('employee.startDate')).format('D MMM YYYY');
  }.property('employee.startDate'),

  dateOfBirthFormat: function () {
    return moment(this.get('employee.dateOfBirth')).format('D MMM YYYY');
  }.property('employee.dateOfBirth')

});
