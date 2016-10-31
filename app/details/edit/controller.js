import Ember from 'ember';
import i18n from 'ess/i18n';

export default Ember.Controller.extend({
  details: Ember.inject.controller(),
  tabSelected: Ember.computed.reads('details.selectedForEdit'),
  tabContainerConfig: Ember.computed('tabSelected', function() {
    return [
      {
        tabName: 'name',
        tabTitle: i18n.t('details.name'),
        tabContent: 'edit-name-form',
        active: this.get('tabSelected') === 'name'
      },
      {
        tabName: 'contact',
        tabTitle: i18n.t('details.contact'),
        tabContent: 'edit-contact-form',
        active: this.get('tabSelected') === 'contact'
      }
    ];
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
  employee: Ember.computed.reads('details.attrs.employee')

  // actions: {
  //   selectTab(tabName) {
  //     this.set('tabSelected', tabName);
  //   },
  //   selectItem(value) {
  //     this.set('make', value);
  //     console.log(value);
  //   }
  // }
});
