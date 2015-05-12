import SirenAdapter from './siren';
import Ember from 'ember';
import config from 'ess/config/environment';

export default SirenAdapter.extend({
  appStateService: Ember.inject.service(),

  headers: function() {
    var employeeId = this.get('appStateService.authenticatedEmployeeId');

    return (employeeId && employeeId !== '0') ? {
      "X-Fourth-Version": 0,
      "X-Fourth-UserID": employeeId,
      "X-Fourth-Org": 0
    } : {};
  }.property('appStateService.authenticatedEmployeeId'),

  host: function() {
    return config.apiBaseUrl;
  }.property(),

  namespace: function() {
    return `employees/${this.get('appStateService.authenticatedEmployeeId')}`;
  }.property('appStateService.authenticatedEmployeeId')
});
