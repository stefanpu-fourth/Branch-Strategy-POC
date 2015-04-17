import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  actions: {
    setSelectedIndex: function(index=1) {
      if (index === this.get('selectedIndex')) {
        return;
      }

      this.set('selectedIndex', index);
      this.set('selectedDayIndex', undefined);
      this.set('selectedSegmentIndex', undefined);
    },

    setSelectedShift: function(shift, day) {
      this.set('selectedDayIndex', day);
      this.set('selectedShift', shift);
    }
  }
});
