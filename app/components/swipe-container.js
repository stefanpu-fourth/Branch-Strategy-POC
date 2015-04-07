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

  selectedIndex: null,

  xPos: 0,

  deltaX: 0,

  xPosStart: 0,

  isMoving: false,

  wrapStyles: function () {
    var selectedIndex = this.get('selectedIndex') || 0;
    var viewPortWidth = this.getViewPortWidth();
    var wrapOffset = -Math.abs(selectedIndex * (viewPortWidth - 48));

    return `transform: translate3d(${wrapOffset}px, 0, 0); visibility: visible;`;
  }.property('selectedIndex'),

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
    this.sendAction('setSelectedIndex');
  },

  willDestroyElement: function () {
    var transitionEvents = this.get('transitionEvents');

    this.$(window).off('resize');
    this.$('.swipe__wrap').off(transitionEvents);
  },

  getViewPortWidth: function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },

  //still required for the resize handler
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
    var selectedIndex = this.get('selectedIndex');

    $cards.css('width', viewPortWidth - 64);
    this.setWrapOffset(selectedIndex, viewPortWidth);
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
    var index;

    if(Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    $wrap = this.$('.swipe__wrap');
    $cards = $wrap.children('.card');

    currentDelta = this.get('deltaX');
    index = this.get('selectedIndex');

    $wrap.removeClass('swipe--dragging');

    this.set('isMoving', true);

    if(currentDelta < 0) {
      if(index !== $cards.length - 1) {
        index++;
      }
    } else {
      if(index !== 0) {
        index--;
      }
    }

    this.sendAction('setSelectedIndex', index);
  },

  panLeft: horizontalPanHandler,

  panRight: horizontalPanHandler
});
