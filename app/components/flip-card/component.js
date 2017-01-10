import Ember from 'ember';

var run = Ember.run;

/**
  @class FlipCard
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  /**
    @property tagName
    @type {String}
    @default div
    @public
  */

  tagName: 'div',
  /**
    @property classNames
    @type {Array}
    @default ['flip-card']
    @public
  */

  classNames: ['flip-card'],
  /**
    @property classNameBindings
    @type {Array}
    @default ['isFlipped:-flipped', 'isFlippable:-flippable']
    @public
  */
  classNameBindings: ['isFlipped:-flipped', 'isFlippable:-flippable'],

  /**
    @property attributeBindings
    @type {Array}
    @default ['style']
    @public
  */
  attributeBindings: ['style'],

  /**
    @property height
    @type {Number}
    @default 240
    @public
  */
  height: 240,

  /**
    @property isFlipped
    @type {Boolean}
    @default false
    @public
  */
  isFlipped: false,

  /**
    @property isFlippable
    @type {Boolean}
    @default false
    @public
  */
  isFlippable: false,

  /**
    @property breakpoint
    @type {CSSStyle}
    @default null
    @public
  */
  breakpoint: null,

  /**
    @property style
    @type {String}
    @public
  */
  style: function () {
    var cardHeight = this.get('height');
    return `height: ${cardHeight}px;`.htmlSafe();
  }.property('height'),

  /**
    @property nsResize
    @type {String}
    @public
  */
  nsResize: function () {
    var namespace = Ember.guidFor(this);
    return `resize.${namespace}`;
  }.property(),

  /**
    @property transitionEvents
    @type {String}
    @public
  */
  transitionEvents: function () {
    var namespace = Ember.guidFor(this);
    var evts = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd'];
    return evts.map(str => { return `${str}.${namespace}`; }).join(' ');
  }.property(),

  didInsertElement: function () {
    var evt = this.get('nsResize');

    this.boundResizeHandler = run.bind(this, 'resizeHandler');
    this.$(window).on(evt, this.boundResizeHandler);

    this.boundTransitionHandler = run.bind(this, 'transitionEnd');
    this.$().on(this.get('transitionEvents'), this.boundTransitionHandler);

    run.scheduleOnce('afterRender', this, 'resizeHandler');
  },

  willDestroyElement: function () {
    var evt = this.get('nsResize');
    this.$(window).off(evt, this.boundResizeHandler);
    this.$().off(this.get('transitionEvents'), this.boundTransitionHandler);
  },

  /**
    Handles the 'resize' event, by setting 'isFlippable' and is 'isFlipped'.

    @method resizeHandler
    @public
  */
  resizeHandler: function () {
    var isFlippable = !window.matchMedia(this.breakpoint).matches;

    this.set('isFlippable', isFlippable);

    if (isFlippable) {
      this.set('isFlipped', false);
    }
  },

  /**
    At transistion end removes '-animating' class

    @method transitionEnd
    @public
  */
  transitionEnd: function () {
    this.$().removeClass('-animating');
  },

  actions: {
    /**
      Flips the card if it is not already flipped.

      @method flipCard
      @public
    */
    flipCard: function () {
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
