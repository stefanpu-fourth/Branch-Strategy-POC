import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['swipe__tabs'],

  collection: null,

  selectedIndex: null,

  didInsertElement: function () {
    var selectedIndex = this.get('selectedIndex') || 0;
    var $tabs = this.$('.swipe__tablink');
    var $active = $tabs.eq(selectedIndex);
    var viewPortWidth = this.getViewPortWidth();
    var activeElWidth = $active.outerWidth();
    var totalTabWidth = $tabs.length * activeElWidth;
    var $container;
    var left;
    var scrollLeft;
    var adjustedWidth;

    $tabs.removeClass('swipe__tablink--active');
    $active.addClass('swipe__tablink--active');

    if ((viewPortWidth + 12) > totalTabWidth) {
      return;
    }

    $container = this.$();
    left = $active.position().left;
    scrollLeft = $container.scrollLeft();
    adjustedWidth = (viewPortWidth / 2) - (activeElWidth / 2);

    $container.animate(scrollLeft + left - adjustedWidth);
  },

  getViewPortWidth: function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },
});
