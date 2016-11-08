import Ember from 'ember';
import i18n from 'ess/i18n';

export default Ember.Controller.extend({
  details: Ember.inject.controller(),
  //employee: Ember.computed.alias('details.attrs.employee'),
  nextOfKins: Ember.computed.alias('details.attrs.nextOfKins'),
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
      },
      {
        name: 'nextOfKin',
        title: i18n.t('details.nextOfKin'),
        component: 'edit-nok-form',
        componentModel: this.get('nextOfKins'),
        active: this.get('tabSelected') === 'nextOfKin'
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
