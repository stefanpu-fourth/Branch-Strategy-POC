import Ember from 'ember';
import config from 'ess/config/environment';

export default Ember.Route.extend({
  appStateService: Ember.inject.service(),

  title: 'HR DETAILS',

  model: function () {
    var employement = this.store.all('mainemployment');

    if (Ember.isEmpty(employement) || !config.cacheResources) {
      employement = this.store.find('mainemployment');
    }

    return Ember.RSVP.hash({
      employment: employement,
      employee: this.store.find('employee', this.get('appStateService.authenticatedEmployeeId'))
    });
  },

  setupController: function (controller, model) {
    controller.set('attrs.employment', model.employment);
    controller.set('attrs.employee', model.employee);
  }
});
