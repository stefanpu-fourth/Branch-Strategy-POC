import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    setSelectedIndex: function(index) {
      var attrs = this.get('controller.attrs');
      var currentIndex = attrs.selectedIndex;
      var hasCurrentIndex = typeof currentIndex !== 'undefined' && currentIndex !== null;

      //set the value of index to be index or the length of the collection - 1
      index = typeof index !== 'undefined' && index !== null ? index : attrs[this.collectionName].get('content.length') - 1;

      //don't set the index if it hasn't changed
      if (hasCurrentIndex && index === currentIndex) {
        return;
      }

      //set selectedIndex on controller attrs hash
      //set is panning only if we don't have a currentIndex as this
      //creates weird view behaviour (panning when we don't want to)
      this.set('controller.attrs.selectedIndex', index);
      this.set('controller.attrs.isPanning', !hasCurrentIndex);
    }
  }
});
