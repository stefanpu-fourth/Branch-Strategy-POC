import Ember from 'ember';
import SetSelectedIndex from 'ess/mixins/controller-set-selected-index';

export default Ember.Controller.extend(SetSelectedIndex, {
  attrs: {},

  actions: {
    setSelectedShift: function(shift) {
      this.setProperties({
        'attrs.selectedShift': shift,
        'attrs.selectedOverlap': undefined
      });
    },

    setSelectedOverlap: function(overlap) {
      this.setProperties({
        'attrs.selectedOverlap': overlap,
        'attrs.selectedShift': undefined
      });
    }
  }
});
