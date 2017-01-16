import Ember from 'ember';
import i18n from 'ess/i18n';

/**
  @class DetailsController
  @extends Ember.Controller
  @module Details
*/
export default Ember.Controller.extend({
  attrs: {},

  /**
    @property employment
    @type {Object}
    @public
  */
  employment: Ember.computed.alias('attrs.employment.firstObject'),

  /**
    @property selectedForEdit
    @type {String}
    @default 'name'
    @public
  */
  selectedForEdit: 'name',

  /**
    @property isModalOpen
    @type {Boolean}
    @default false
    @public
  */
  isModalOpen: false,

  /**
     Renders a notification popup using 'message' and 'type' properties

     @method _renderMessage
     @param {String} message
     @param {String} type
     @private
   */
  _renderMessage(message, type) {
    this.get('notifications').addNotification({
      message: message,
      type: type,
      autoClear: true,
      clearDuration: 5000
    });
  },

  actions: {
    /**
      Sets selected detail for edition and opens edit modal.

      @method edit
      @param {String} selected
      @public
    */
    edit(selected) {
      this.set('selectedForEdit', selected);
      this.set('isModalOpen', true);
    },

    /**
     Fires when the user click a save button.
     Checks if the model has dirty properties.
     Checks if every field is valid.
     Creates a PUT request to save the employee.
     Gets the employee model form the API.
     Generates notifications to inform the user.

     @method saveEmployee
     @public
   */
    saveEmployee() {
      const modelData = this.get('attrs.employee');
      const isModelDataValid = modelData.get('validations.isValid');
      const modelHasChangedAttributes = modelData.get('hasDirtyAttributes');

      if (modelHasChangedAttributes && isModelDataValid) {
        modelData.save().then(() => {
          this._renderMessage(i18n.t('successNotifications.employeeUpdate'), 'success');
          this.set('isModalOpen', false);
          modelData.reload();
        }, (error) => {
          this._renderMessage(i18n.t('errorNotifications.employeeUpdate'), 'error');
          this.set('isModalOpen', false);
          modelData.rollbackAttributes();
          console.error(error);
        });
      } else if (modelHasChangedAttributes && !isModelDataValid) {
        this._renderMessage(i18n.t('errorNotifications.invalidFields'), 'error');
      }
    },

    /**
     Fires when the user click a back/close button.
     Checks if the model has dirty properties.
     Reverts the changes made by the user.

     @method _renderMessage
     @param {String} message
     @param {String} type
     @private
   */
    cancelEdit() {
      const modelData = this.get('attrs.employee');
      const modelHasChangedAttributes = modelData.get('hasDirtyAttributes');

      if (modelHasChangedAttributes) {
        modelData.rollbackAttributes();
      }

      this.set('isModalOpen', false);
    }
  }
});
