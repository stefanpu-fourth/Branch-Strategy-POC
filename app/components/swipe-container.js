import Ember from 'ember';

var run = Ember.run;
var horizontalPanHandler = function(e) {
  var evt = e.originalEvent;
  var gesture = evt.gesture;
  var deltaX = gesture.deltaX;
  var deltaY = gesture.deltaY;
  var isMoving = this.get('isMoving');
  var $wrap;
  var xPos;

  if(isMoving || Math.abs(deltaY) > Math.abs(deltaX)) {
    return;
  }

  $wrap = this.$('.swipe__wrap');
  xPos = deltaX + this.get('xPosStart');

  if(!$wrap.hasClass('swipe--loaded')) {
    $wrap.addClass('swipe--loaded');
  }

  $wrap.addClass('swipe--dragging').css({
    transform: `translate3d(${xPos}px, 0, 0)`
  });

  this.setProperties({
    xPos: xPos,
    deltaX: deltaX
  });
};

export default Ember.Component.extend({

  classNames: ['swipe'],

  xPos: 0,

  deltaX: 0,

  xPosStart: 0,

  activeCardIndex: 0,

  isMoving: false,

  transitionEvents: function () {
    var namespace = Ember.guidFor(this);
    var evts = [ 'transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd' ];
    return evts.map(str => { return `${str}.${namespace}`; }).join(' ');
  }.property(),

  didInsertElement: function() {
    var transitionEvents = this.get('transitionEvents');
    //bind handlers
    this.$(window).on('resize', run.bind(this, 'resizeHandler'));
    this.$('.swipe__wrap').on(transitionEvents, run.bind(this, 'transitionEnd'));

    //init viewport
    run.once(this, 'resizeHandler');
    this.setActiveCard();
  },

  willDestroyElement: function () {
    var transitionEvents = this.get('transitionEvents');

    this.$(window).off('resize');
    this.$('.swipe__wrap').off(transitionEvents);
  },

  getViewPortWidth: function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },

  setActiveCard: function(index = 0) {
    var $cards;

    if(index === this.get('activeCardIndex')) {
      return;
    }

    this.set('activeCardIndex', index);

    $cards = this.$('.card');
    $cards.removeClass('card--active').eq(index).addClass('card--active');
  },

  setWrapOffset: function(index, viewPortWidth) {
    var $wrap = this.$('.swipe__wrap');
    var wrapOffset;

    viewPortWidth = viewPortWidth || this.getViewPortWidth();
    wrapOffset = -Math.abs(index * (viewPortWidth - 48));

    $wrap.css({
      transform: `translate3d(${wrapOffset}px, 0, 0)`,
      visibility: 'visible'
    });
  },

  resizeHandler: function() {
    var $wrap = this.$('.swipe__wrap');
    var $cards = $wrap.children('.card');
    var viewPortWidth = this.getViewPortWidth();
    var activeCardIndex = this.get('activeCardIndex');

    $cards.css('width', viewPortWidth - 64);
    this.setWrapOffset(activeCardIndex, viewPortWidth);
  },

  transitionEnd: function() {
    var $wrap = this.$('.swipe__wrap');

    this.setProperties({
      xPosStart: $wrap.offset().left - 30,
      isMoving: false
    });
  },

  panEnd: function(e) {
    var evt = e.originalEvent;
    var gesture = evt.gesture;
    var deltaX = gesture.deltaX;
    var deltaY = gesture.deltaY;
    var $wrap;
    var $cards;
    var currentDelta;
    var activeCardIndex;

    if(Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    $wrap = this.$('.swipe__wrap');
    $cards = $wrap.children('.card');

    currentDelta = this.get('deltaX');
    activeCardIndex = this.get('activeCardIndex');

    $wrap.removeClass('swipe--dragging');

    this.set('isMoving', true);

    if(currentDelta < 0) {
      if(activeCardIndex !== $cards.length - 1) {
        activeCardIndex++;
      }
    } else {
      if(activeCardIndex !== 0) {
        activeCardIndex--;
      }
    }

    this.setWrapOffset(activeCardIndex);
    this.setActiveCard(activeCardIndex);
  },

  panLeft: horizontalPanHandler,

  panRight: horizontalPanHandler
});
