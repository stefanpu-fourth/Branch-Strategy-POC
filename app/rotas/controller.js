import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  holiday: Ember.computed.alias('attrs.holiday.firstObject'),

  actions: {
    setSelectedIndex: function(index) {
      var currentIndex = this.get('selectedIndex');
      var hasCurrentIndex = typeof currentIndex !== 'undefined' && currentIndex !== null;

      //set the value of index to be index or default of 2
      index = typeof index !== 'undefined' && index !== null ? index : 2;

      //don't set the index if it hasn't changed
      if (hasCurrentIndex && index === currentIndex) {
        return;
      }

      //set selectedIndex on controller attrs hash
      //set is panning only if we don't have a currentIndex as this
      //creates weird view behaviour (panning when we don't want to)
      this.set('selectedIndex', index);
      this.set('isPanning', !hasCurrentIndex);
    },

    setSelectedShift: function(shift) {
      this.set('selectedShift', shift);
    }
  }
});
