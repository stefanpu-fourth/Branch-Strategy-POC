import Ember from 'ember';

export default Ember.Route.extend({
  appStateService: Ember.inject.service(),

  model: function() {
    return this.store.find('root');
  },

  afterModel: function(rootResource) {
    this.set('appStateService.rootResource', rootResource.get('firstObject'));
  },

  actions: {
    setCurrentEmployee: function (employeeId) {
      var employee = this.store.getById('root', employeeId) || this.store.createRecord('root', { id: employeeId });
      this.set('appStateService.rootResource', employee);
    }
  }
});
