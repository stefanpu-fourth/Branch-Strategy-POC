import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  actions: {
    setSelectedShift: function(shift) {
      this.set('attrs.selectedShift', shift);
    }
  }
});
