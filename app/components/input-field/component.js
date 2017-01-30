import Ember from 'ember';

/**
  @class InputField
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({

  /**
    @property classNameBindings
    @type {Array}
    @public
  */
  classNameBindings: ['inputClassName'],

  /**
    @property inputClassName
    @type {String}
    @public
  */
  inputClassName: Ember.computed(function () {
    return 'input__field__' + this.get('inputId');
  }),

  /**
    @property isFocused
    @type {Boolean}
    @public
  */
  isFocused: Ember.computed('value', function () {
    return this.get('value') ? true : false;
  }),

  actions: {
    /**
      Executes on "focus-in" event of the input field.
      Sets "isFocused" property to true

      @method focusIn
      @public
    */
    focusIn() {
      this.set('isFocused', true);
    },

    /**
      Executes on "focus-out" event of the input field.
      Sets "isFocused" property to true if "value" property is not empty,
      to set the proper CSS class to the input field and create proper UX behavior.

      @method focusOut
      @public
    */
    focusOut() {
      this.set('isFocused', this.value ? true : false);
    },

    /**
      Executes on "click" event on the "X" icon of the input field,
      and clears its value.
      Clears the "value" property of the input field by setting it to an empty string.
      Sets "isFocused" property to false.

      @method clearInput
      @public
    */
    clearInput() {
      this.set('value', '');
      this.set('isFocused', false);
    }
  }
});
