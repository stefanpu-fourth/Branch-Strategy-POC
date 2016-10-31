import Ember from 'ember';

export default Ember.Component.extend({
  isFocused: false,
  actions: {
    focusIn() {
      this.set('isFocused', true);
    },
    focusOut() {
      this.set('isFocused', false);
    },
    selectItem(item) {
      this.set('selectedItem', item);
      console.log(this.get('selectedItem'));
    }
  }
});
