import Ember from 'ember';
import i18n from 'ess/i18n';

export default Ember.Controller.extend({
  details: Ember.inject.controller(),
  tabSelected: Ember.computed.reads('details.selectedForEdit'),
  tabContainerConfig: Ember.computed('tabSelected', function() {
    return [
      {
        name: 'name',
        title: i18n.t('details.name'),
        component: 'edit-name-form',
        componentModel: this.get('employee'),
        active: this.get('tabSelected') === 'name'
      },
      {
        name: 'contact',
        title: i18n.t('details.contact'),
        component: 'edit-contact-form',
        componentModel: this.get('employee'),
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
});
