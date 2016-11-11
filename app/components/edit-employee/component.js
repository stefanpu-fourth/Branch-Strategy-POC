import Ember from 'ember';
import i18n from 'ess/i18n';

export default Ember.Component.extend({
  tabContainerConfig: Ember.computed('selectedForEdit', function () {
    return [
      {
        name: 'name',
        title: i18n.t('details.name'),
        component: 'edit-name-form',
        componentModel: this.get('employee'),
        active: this.get('selectedForEdit') === 'name'
      },
      {
        name: 'contact',
        title: i18n.t('details.contact'),
        component: 'edit-contact-form',
        componentModel: this.get('employee'),
        active: this.get('selectedForEdit') === 'contact'
      }
    ];
  }),
  actions: {
    closeModal() {
      this.set('isOpen', false);
    }
  }
});
