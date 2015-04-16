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

    setSelectedSegmentInfo: function(segment, day) {
      console.log("in setSelectedSegmentInfo action with %o, %o", segment, day);

      this.set('selectedDayIndex', day);
      this.set('selectedSegmentIndex', segment);
    }
  }
});
