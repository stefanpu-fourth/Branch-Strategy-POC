import Ember from 'ember';
import config from 'ess/config/environment';

export default Ember.Route.extend({
  appStateService: Ember.inject.service(),

  model: function() {
    return this.store.find('root');
  },

  afterModel: function(rootResource) {
    this.set('appStateService.rootResource', rootResource.get('firstObject'));
  },

  setupController: function(controller, model) {
    this.store.find('mainemployment').then(employment => {
      controller.setProperties({
        'model': model,
        'showEmployeeDropdown': config.showEmployeeDropdown,
        'employment': employment.get('firstObject')
      });
    });
  },

  refreshCurrentRoute: function () {
    var handlerInfos = this.get('router.router.currentHandlerInfos');
    var handler = handlerInfos[handlerInfos.length - 1];
    this.container.lookup(`route:${handler.name}`).refresh();
  },

  actions: {
    setCurrentEmployee: function (employeeId) {
      var employee = this.store.getById('root', employeeId) || this.store.createRecord('root', { id: employeeId });
      this.set('appStateService.rootResource', employee);
      this.refreshCurrentRoute();
    }
  }
});
