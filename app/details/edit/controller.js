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
        tabContent: 'name-edit-form',
        active: this.get('tabSelected') === 'name'
      },
      {
        tabName: 'contact',
        tabTitle: i18n.t('details.contact'),
        tabContent: 'contact-edit-form',
        active: this.get('tabSelected') === 'contact'
      }
    ];
  })
});
