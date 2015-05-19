import SirenAdapter from './siren';
import Ember from 'ember';
import config from 'ess/config/environment';

export default SirenAdapter.extend({
  appStateService: Ember.inject.service(),

  headers: function() {
    var employeeToken = this.get('appStateService.authenticatedEmployeeToken');

    return !!employeeToken ? {
      "X-Fourth-Version": 0,
      "X-Fourth-UserID": employeeToken,
      "X-Fourth-Org": 0
    } : {};
  }.property('appStateService.authenticatedEmployeeToken'),

  host: function() {
    return config.apiBaseUrl;
  }.property(),

  namespace: function() {
    return `employees/${this.get('appStateService.authenticatedEmployeeId')}`;
  }.property('appStateService.authenticatedEmployeeId')
});
