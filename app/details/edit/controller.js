import Ember from 'ember';

export default Ember.Controller.extend({
  details: Ember.inject.controller(),
  tabSelected: Ember.computed.reads('details.selectedForEdit'),
  nameTabSelected: Ember.computed('tabSelected', function() {
    return this.get('tabSelected') === 'name';
  }),
  contactTabSelected: Ember.computed('tabSelected', function() {
    return this.get('tabSelected') === 'contact';
  }),

  actions: {
    selectTab(tabName) {
      this.set('tabSelected', tabName);
    }
  }
});
