import Ember from 'ember';

var run = Ember.run;

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['flip-card'],
  classNameBindings: ['isFlipped:-flipped', 'showSideBySide:-side-by-side'],

  attributeBindings: ['style'],

  height: 240,

  isFlipped: false,

  breakpoint: null,
  showSideBySide: false,

  style: function() {
    var cardHeight = this.get('height');
    return `height: ${cardHeight}px;`.htmlSafe();
  }.property('height'),

  didInsertElement: function() {
    this.boundResizeHandler = run.bind(this, 'resizeHandler');
    this.$(window).on('resize', this.boundResizeHandler);

    run.once(this, 'resizeHandler');
  },

  willDestroyElement: function() {
    this.$(window).off('resize', this.boundResizeHandler);
  },

  resizeHandler: function() {
    var breakpoint = parseInt(this.get('breakpoint'));

    if (breakpoint) {
      var cardWidth = this.$().width();
      this.set('showSideBySide', breakpoint <= cardWidth);
      if (this.showSideBySide) {
        this.set('isFlipped', false);
      }
    }
  },

  actions: {
    flipCard: function() {
      if (this.showSideBySide) {
        this.set('isFlipped', false);
      } else {
        this.toggleProperty('isFlipped');
      }
    }
  }
});
