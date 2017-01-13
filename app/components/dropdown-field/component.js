import Ember from 'ember';

/**
  @class DropdownField
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  /**
    @property isFocused
    @type {Boolean}
    @public
  */
  isFocused: Ember.computed('selectedItem', function() {
    return this.get('selectedItem') ? true : false;
  }),
  actions: {
    /**
      Executes on "focus-in" event of the input field.

      @method focusIn
      @public
    */
    focusIn() {
      this.set('isFocused', true);
    },
    /**
      Executes on "focus-out" event of the input field.

      @method focusOut
      @public
    */
    focusOut() {
      this.set('isFocused', this.get('selectedItem') ? true : false);
    },

    /**
      Selects the item.

      @method selectItem
      @public
    */
    selectItem(item) {
      this.set('selectedItem', item);
    }
  }
});
