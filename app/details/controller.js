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
    `conditional-validation-fields` service injection.
    Used to store and govern conditional properties requirements.

    @property conditions
    @type ConditionalValidationFieldsService
    @public
  */
  conditions: Ember.inject.service('conditional-validation-fields'),

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

  /**
     Used to call the service: "conditional-validation-fields"
     in order to notify the validators of the new requirements.

     @method _parseErrorResponse
     @param {String} exceptionMessage
     @private
     @deprecated this is a dirty fix used for now
   */
  _parseErrorResponse(exceptionMessage) {
    const conditionsService = this.get('conditions');
    conditionsService.parseResponse(exceptionMessage);
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
     If the request fails indicating a required optional property,
     the conditional property is set to required and indicates the invalid state.
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
          //if the error is due to some fields which initially appear optional and need
          //to be set to mandatory we attach status and detail in the employee Adapter.
          if (error.errors && error.errors[0].status === 400 &&
             error.errors[0].detail && error.errors[0].errorCase === 'mandatory_property') {
            const currentError = error.errors[0];
            console.log(currentError);
            let a = 5 + 5;
            a += 2;
            console.log(a);
            this._parseErrorResponse(currentError.detail);
          } else {
            this.set('isModalOpen', false);
            modelData.rollbackAttributes();
          }

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
