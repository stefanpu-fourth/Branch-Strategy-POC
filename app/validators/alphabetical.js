import BaseValidator from 'ember-cp-validations/validators/base';

/**
  @class Alphabetical
  @extends BaseValidator
  @module validators
  @public
*/
const Alphabetical = BaseValidator.extend({
  /**
    Executes when the value of a property, having "alphabetical" validator changes.
    Checks if the value contains only letters.
    Returns true if value is valid.
    Returns error message if value is invalid.

    @method validate
    @param {String} value
    @param {Object} options
    @public
  */
  validate(value, options) {
    const message = options.message;

    if (value) {
      /**
        Allows letters, dashes and apostrophes.

        ^[A-z]+           - Match beginning of string. Must contain letters one or more times.
        [ |'|-]?          - Might contain white space, apostrophe or dash one or zero times.
        [A-z\s]+          - Allows letters and spaces one or more times.
        [A-z\s]+$         - Match end of string. Must contain letters and/or spaces one or more times.
      */
      const regex = /^[A-z]+[ |'|-]?[A-z]+[ |'|-]?[A-z\s]+$/;

      return regex.test(value) || message;
    } else {
      return options.allowBlank;
    }
  }
});

Alphabetical.reopenClass({
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

export default Alphabetical;
