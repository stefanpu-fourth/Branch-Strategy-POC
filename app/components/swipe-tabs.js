import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['swipe__tabs'],

  collection: null,

  selectedIndex: null,

  didInsertElement: function () {
    this.addObserver('selectedIndex', this, this.setScrollLeft);
  },

  setScrollLeft: function () {
    var index = this.get('selectedIndex') || 0;
    var $container = this.$();
    var $tabs = $container.children('.swipe__tablink');
    var $activeTab = $tabs.eq(index);

    if ($activeTab.length) {
      this.$().animate({ scrollLeft: $activeTab.offset().left - 12 }, 200);
    }
  },

  getViewPortWidth: function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },

  actions: {
    setSelectedIndex: function(index) {
      this.sendAction('setSelectedIndex', index);
    }
  }
});
