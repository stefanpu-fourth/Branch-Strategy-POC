import Ember from 'ember';

export default Ember.Component.extend({
  isFocused: Ember.computed('value', function() {
    return this.get('value') ? true : false;
  }),
  actions: {
    focusIn() {
      this.set('isFocused', true);
    },
    focusOut() {
      this.set('isFocused', this.value ? true : false);
    },
    clearInput() {
      this.set('value', undefined);
      this.set('isFocused', false);
    }
  }
});
