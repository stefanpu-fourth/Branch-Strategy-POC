import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['swipe--tabs'],

  collection: null,

  selectedIndex: null,

  didInsertElement: function () {
    this.addObserver('selectedIndex', this, this.setScrollLeft);
  },

  setScrollLeft: function () {
    var index = this.get('selectedIndex') || 0;
    var $container = this.$();
    var $tabs = $container.children('.swipe--tablink');
    var $activeTab = $tabs.eq(index);

    if ($activeTab.length) {
      this.$().animate({ scrollLeft: $activeTab.offset().left - 12 }, 200);
    }
  },

  getViewPortWidth: function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },

  panStart: function(ev) {
    ev.stopPropagation();
  },

  panMove: function(ev) {
    ev.stopPropagation();
  },

  panLeft: function(ev) {
    ev.stopPropagation();
  },

  panRight: function(ev) {
    ev.stopPropagation();
  },

  actions: {
    setSelectedIndex: function(index) {
      this.sendAction('setSelectedIndex', index);
    }
  }
});
