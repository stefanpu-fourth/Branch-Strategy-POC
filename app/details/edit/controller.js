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
  editInfo: {
    name: {
      title: '',
      firstName: '',
      middleName: '',
      lastName: ''
    },
    selectedTitle: '',
    titles: ['Mr', 'Mrs', 'Miss', 'Ms']
  },
  employee: Ember.computed.reads('details.attrs.employee'),

  actions: {
    selectTab(tabName) {
      this.set('tabSelected', tabName);
    },
    selectItem(value) {
      this.set('make', value);
      console.log(value);
    }
  }
});
