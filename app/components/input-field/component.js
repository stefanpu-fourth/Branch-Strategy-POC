import Ember from 'ember';

export default Ember.Component.extend({
  isFocused: false,
  actions: {
    focusOut() {
      this.set("isFocused", this.value ? true : false);
    },
    focusIn () {
      this.set("isFocused", true);
    }
  }
});
