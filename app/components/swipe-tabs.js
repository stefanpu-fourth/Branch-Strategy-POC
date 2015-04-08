import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['swipe__tabs'],

  collection: null,

  selectedIndex: null,

  didInsertElement: function () {
    Ember.run.once(this, 'setScrollLeft');
  },

  setScrollLeft: function (index=0) {
    var $container = this.$();
    var $tabs = $container.children('.swipe__tablink');
    var $activeTab = $tabs.eq(index);
    var left = $activeTab.offset().left - 12;

    this.$().animate({ scrollLeft: left }, 200);
  },

  getViewPortWidth: function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },

  actions: {
    setSelectedIndex: function(index) {
      this.sendAction('setSelectedIndex', index);
      this.setScrollLeft(index);
    }
  }
});
