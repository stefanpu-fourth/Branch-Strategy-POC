import SirenAdapter from './siren';
import Ember from 'ember';
import config from 'ess/config/environment';

export default SirenAdapter.extend({
  appStateService: Ember.inject.service(),

  employeeId: Ember.computed.alias('appStateService.authenticatedEmployeeId'),

  headers: function() {
    var employeeId = this.get('employeeId');

    return (employeeId && employeeId !== '0') ? {
      "X-Fourth-Version": 0,
      "X-Fourth-UserID": employeeId,
      "X-Fourth-Org": 0
    } : {};
  }.property('employeeId'),

  host: function() {
    return config.apiBaseUrl;
  }.property(),

  namespace: function() {
    return `employees/${this.get('employeeId')}`;
  }.property('employeeId')
});
