import Ember from 'ember';

/**
  Used to store the constant literals used to parse invalid responses from the API
  whether some property needs to be made from conditional to mandatory.
  @property conditionalPropertyArray
  @type {Array}
  @private
*/
const conditionalPropertyArray = [
  { errorName: 'Postcode', propertyName: 'postCode' },
  { errorName: 'Home Telephone', propertyName: 'homeTel' },
  { errorName: 'Mobile Telephone', propertyName: 'mobileTel' },
  { errorName: 'Work Email', propertyName: 'workEmail' },
  { errorName: 'Home Email', propertyName: 'homeEmail' }
];

/**
  Provides a mechanism to get/set the presense requirement of conditional
  properties defined in the backend API. The properties are defined by the
  API flags.
  NOTE: this is used as a dirty fix until the back end is able to send the
  conditional properties and their corresponding presense requirements.

  Typical use case:

  * Inject service into target controllers and validators.
  * Send a failing request due to invalid model state.
  * Set the optional fields responsible for failure to be mandatory.
  * The change will be represented in the form validation.

  @class ConditionalValidationService
  @extends Ember.Service
  @module Services
  @public
*/
export default Ember.Service.extend({
  postCode: false,

  homeTel: false,

  mobileTel: false,

  workEmail: false,

  homeEmail: false,

  /**
     Used to set optional fields to be required in the service:
     "conditional-validation-fields" in order to notify the validators of the
     new requirements.

     @method _parseErrorResponse
     @param {String} exceptionMessage
     @private
     @deprecated this is a dirty fix used for now
   */
  parseResponse(errorMessage) {
    conditionalPropertyArray.forEach((errorItem) => {
      const isPropertyPresent = errorMessage.includes(errorItem.errorName);
      if (isPropertyPresent) {
        this.set(errorItem.propertyName, true);
      }
    });
  }
});
