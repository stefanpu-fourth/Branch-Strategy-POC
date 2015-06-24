import SirenAdapter from './siren';
import Ember from 'ember';
import config from 'ess/config/environment';

export default SirenAdapter.extend({
  appStateService: Ember.inject.service(),

  host: function() {
    return config.apiBaseUrl;
  }.property(),

  namespace: function() {
    return `employees/${this.get('appStateService.authenticatedEmployeeId')}`;
  }.property('appStateService.authenticatedEmployeeId'),

  defaultSerializer: 'ess'
});
