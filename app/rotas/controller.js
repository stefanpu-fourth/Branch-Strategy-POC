import Ember from 'ember';
import SetSelectedIndex from 'ess/mixins/controller-set-selected-index';

export default Ember.Controller.extend(SetSelectedIndex, {
  attrs: {},

  actions: {
    setSelectedShift: function(shift) {
      this.set('attrs.selectedShift', shift);
      this.set('attrs.selectedOverlap', undefined);
    },

    setSelectedOverlap: function(overlap) {
      this.set('attrs.selectedOverlap', overlap);
      this.set('attrs.selectedShift', undefined);
    }
  }
});
