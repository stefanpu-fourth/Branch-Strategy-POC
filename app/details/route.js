import Ember from 'ember';

export default Ember.Route.extend({
  appStateService: Ember.inject.service(),

  model: function () {
    return Ember.RSVP.hash({
      employment: this.store.find('mainemployment'),
      employee: this.store.find('employee', this.get('appStateService.authenticatedEmployeeId'))
    });
  },

  setupController: function (controller, model) {
    controller.set('attrs.employment', model.employment);
    controller.set('attrs.employee', model.employee);
  }
});
