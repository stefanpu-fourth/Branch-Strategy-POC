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

  transitionEvents: function () {
    var namespace = Ember.guidFor(this);
    var evts = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd'];
    return evts.map(str => { return `${str}.${namespace}`; }).join(' ');
  }.property(),

  didInsertElement: function() {
    var evt = this.get('nsResize');

    this.boundResizeHandler = run.bind(this, 'resizeHandler');
    this.$(window).on(evt, this.boundResizeHandler);

    this.boundTransitionHandler = run.bind(this, 'transitionEnd');
    this.$().on(this.get('transitionEvents'), this.boundTransitionHandler);

    run.scheduleOnce('afterRender', this, 'resizeHandler');
  },

  willDestroyElement: function() {
    var evt = this.get('nsResize');
    this.$(window).off(evt, this.boundResizeHandler);
    this.$().off(this.get('transitionEvents'), this.boundTransitionHandler);
  },

  resizeHandler: function() {
    var isFlippable = !window.matchMedia(this.breakpoint).matches;

    this.set('isFlippable', isFlippable);

    if (isFlippable) {
      this.set('isFlipped', false);
    }
  },

  transitionEnd: function() {
    this.$().removeClass('-animating');
  },

  actions: {
    flipCard: function() {
      var flippeable = this.get('isFlippable');
      var hack;

      if (flippeable) {
        this.$().addClass('-animating');

        //hack to force the browser to redraw before the transition starts
        hack = this.element.offsetHeight;

        this.toggleProperty('isFlipped', this.get('isFlipped'));
      }
    }
  }
});
