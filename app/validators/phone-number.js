import BaseValidator from 'ember-cp-validations/validators/base';

/**
  @class PhoneNumber
  @extends BaseValidator
  @module validators
  @public
*/
const PhoneNumber = BaseValidator.extend({
  /**
    Executes when the value of a property, having "phone-number" validator changes.
    Checks if the value contains only digits.
    Checks if the value contains a leading zero.
    Returns true if value is valid.
    Returns error message if value is invalid.

    @method validate
    @param {String} value
    @param {Object} options
    @public
  */
  validate(value, options) {
    const leadingZeroRegex = /^0.*$/;
    const onlyDigitsRegex = /^[\d\s?]+$/;
    const isLeadingZeroValid = leadingZeroRegex.test(value);
    const isOnlyDigitsValid = onlyDigitsRegex.test(value);

    if (value) {
      if (!isOnlyDigitsValid) {
        return options.onlyDigitsErrorMessage;
      } else if (!isLeadingZeroValid) {
        return options.leadingZeroErrorMessage;
      } else {
        return true;
      }
    } else {
      return options.allowBlank;
    }
  }
});

PhoneNumber.reopenClass({
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

export default PhoneNumber;
