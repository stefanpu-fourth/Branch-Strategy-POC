import BaseValidator from 'ember-cp-validations/validators/base';

/**
  @class Address
  @extends BaseValidator
  @module validators
  @public
*/
const Address = BaseValidator.extend({
  /**
    Executes when the value of a property, having "address" validator changes.
    Checks if the value doesn't contain ` and | symbols.
    Returns true if value is valid.
    Returns error message if value is invalid.

    @method validate
    @param {String} value
    @param {Object} options
    @public
  */
  validate(value, options) {
    if (value) {
      const regex = /^[^`|]*$/;

      return regex.test(value) || options.message;
    } else {
      return options.allowBlank;
    }
  }
});

Address.reopenClass({
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

export default Address;
