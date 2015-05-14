import Ember from 'ember';

export default Ember.Mixin.create({

  actions: {
    setSelectedIndex: function(index) {
      var attrs = this.get('attrs');
      var currentIndex = attrs.selectedIndex;
      var hasCurrentIndex = typeof currentIndex !== 'undefined' && currentIndex !== null;

      index = typeof index !== 'undefined' && index !== null ? index : attrs.defaultIndex;

      //don't set the index if it hasn't changed
      if (hasCurrentIndex && index === currentIndex) {
        return;
      }

      //set selectedIndex on controller attrs hash
      //set is panning only if we don't have a currentIndex as this
      //creates weird view behaviour (panning when we don't want to)
      this.setProperties({
        'attrs.selectedIndex': index,
        'attrs.isPanning': !hasCurrentIndex
      });
    }
  }
});
