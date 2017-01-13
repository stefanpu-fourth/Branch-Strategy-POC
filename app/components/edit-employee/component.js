import Ember from 'ember';
import i18n from 'ess/i18n';

/**
  @class EditEmployee
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({

  /**
    @property tabContainerConfig
    @type {Array}
    @public
  */
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
    /**
      Closes the details modal

      @method closeModal
      @public
    */
    closeModal() {
      this.sendAction('cancelAction');
      //TODO: get this in the route?
      this.set('isOpen', false);
    },
    saveAction() {
      this.sendAction('saveAction');
    }
  }
});
