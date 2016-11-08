import Ember from 'ember';

export default Ember.Component.extend({
  isFocused: Ember.computed('selectedItem', function() {
    return this.get('selectedItem') ? true : false;
  }),
  actions: {
    focusIn() {
      this.set('isFocused', true);
    },
    focusOut() {
      this.set('isFocused', this.get('selectedItem') ? true : false);
    },
    selectItem(item) {
      this.set('selectedItem', item);
    }
  }
});
