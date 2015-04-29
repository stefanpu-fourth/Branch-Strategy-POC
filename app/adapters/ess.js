import SirenAdapter from './siren';
import config from 'ess/config/environment';
import Ember from 'ember';

export default SirenAdapter.extend({
  appStateService: Ember.inject.service(),

  headers: function() {
    var headers = {
      "X-Fourth-Version": 0,
      "X-Fourth-UserID": config.user,
      "X-Fourth-Org": 0
    };
    return (config.user && config.user !== '0') ? headers : {};
  }.property(),

  host: function() {
    return config.apiBaseUrl;
  }.property(),

  namespace: function() {
    return `employees/${this.get('appStateService.authenticatedEmployeeId')}`;
  }.property()
});
