import BaseValidator from 'ember-cp-validations/validators/base';
import Ember from 'ember';

const ConditionalPresence = BaseValidator.extend({
  conditions: Ember.inject.service('conditional-validation-fields'),

  /**
    Executes when trying to determine whether a conditional property is mandataory or not.
    Relies on the 'conditional-validation-fields' as part of a dirty fix to indicate
    conditional mandatory fields that need to be present in this specific case
    until the API is able to provide the list.

    Checks if the property in the service is true.
    Returns the corresponding error message if it should be present.
    Else returns true indicating a valid state.

    @method validate
    @param {String} value
    @param {Object} options
    @public
  */
  validate(value, options) {
    const service = this.get('conditions');
    const shouldBePresent = service.get(options.currentProperty);

    if (shouldBePresent && !value) {
      return options.errorMessage;
    } else {
      return true;
    }
  }
});

ConditionalPresence.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * [
   * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
   * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
   * ]
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default ConditionalPresence;
