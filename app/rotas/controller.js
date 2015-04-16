import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  actions: {
    setSelectedIndex: function(index=1) {
      if (index === this.get('selectedIndex')) {
        return;
      }

      this.set('selectedIndex', index);
    },

    setSelectedSegmentInfo: function(segment, day, week) {
      console.log("in setSelectedSegmentInfo action with %o, %o, %o", segment, day, week);

      this.set('selectedDayIndex', day);
    }
  }
});
