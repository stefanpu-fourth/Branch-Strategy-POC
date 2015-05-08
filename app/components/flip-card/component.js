import Ember from 'ember';

var run = Ember.run;

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['flip-card'],
  classNameBindings: ['isFlipped:-flipped', 'isFlippable:-flippable'],

  attributeBindings: ['style'],

  height: 240,

  isFlipped: false,
  isFlippable: false,

  breakpoint: null,

  style: function() {
    var cardHeight = this.get('height');
    return `height: ${cardHeight}px;`.htmlSafe();
  }.property('height'),

  nsResize: function () {
    var namespace = Ember.guidFor(this);
    return `resize.${namespace}`;
  }.property(),

  didInsertElement: function() {
    var evt = this.get('nsResize');

    this.boundResizeHandler = run.bind(this, 'resizeHandler');
    this.$(window).on(evt, this.boundResizeHandler);

    run.scheduleOnce('afterRender', this, 'resizeHandler');
  },

  willDestroyElement: function() {
    var evt = this.get('nsResize');
    this.$(window).off(evt, this.boundResizeHandler);
  },

  resizeHandler: function() {
    var breakpoint = parseInt(this.get('breakpoint'), 10);

    if (breakpoint) {
      var cardWidth = this.$().width();
      this.set('isFlippable', breakpoint > cardWidth);
      if (!this.isFlippable) {
        this.set('isFlipped', false);
      }
    }
  },

  actions: {
    flipCard: function() {
      if (this.isFlippable) {
        this.toggleProperty('isFlipped');
      } else {
        this.set('isFlipped', false);
      }
    }
  }
});
