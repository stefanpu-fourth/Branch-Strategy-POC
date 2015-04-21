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

  if (isMoving || Math.abs(deltaY) > Math.abs(deltaX)) {
    return;
  }

  $wrap = this.$('.swipe__wrap');
  xPos = deltaX + this.get('xPosStart');

  $wrap.addClass('swipe--dragging').css({
    transform: `translate3d(${xPos}px, 0, 0)`,
    webkitTransform: `translate3d(${xPos}px, 0, 0)`
  });

  this.setProperties({
    xPos: xPos,
    deltaX: deltaX
  });
};

var panEndHandler = function(e) {
  if (!this.get('isPanning')) {
    return;
  }

  this.set('isPanning', false);

  e.stopPropagation();

  var evt = e.originalEvent;
  var gesture = evt.gesture;
  var deltaX, deltaY;
  if (gesture) {
    deltaX = gesture.deltaX;
    deltaY = gesture.deltaY;
  }
  var $wrap;
  var $cards;
  var currentDelta;
  var index;

  $wrap = this.$('.swipe__wrap');

  $wrap.removeClass('swipe--dragging');

  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    let xPos = this.get('xPosStart');
    $wrap.css({
      transform: `translate3d(${xPos}px, 0, 0)`,
      webkitTransform: `translate3d(${xPos}px, 0, 0)`
    });
    return;
  }

  $cards = $wrap.children('.card');

  currentDelta = this.get('deltaX');
  index = this.get('selectedIndex');

  if (currentDelta < 0) {
    if (index !== $cards.length - 1) {
      index++;
    }
  } else {
    if (index !== 0) {
      index--;
    }
  }

  if (index !== this.get('selectedIndex')) {
    this.set('isMoving', true);
    this.sendAction('setSelectedIndex', index);
  } else {
    let xPos = this.get('xPosStart');
    $wrap.css({
      transform: `translate3d(${xPos}px, 0, 0)`,
      webkitTransform: `translate3d(${xPos}px, 0, 0)`
    });
  }
};

export default Ember.Component.extend({

  classNames: ['swipe'],

  collection: null,

  tabPropertyKey: null,

  selectedIndex: null,

  xPos: 0,

  deltaX: 0,

  xPosStart: 0,

  isMoving: false,

  isPanning: false,

  wrapStyles: function () {
    var selectedIndex = this.get('selectedIndex') || 0;
    var viewPortWidth = this.getViewPortWidth();
    var wrapOffset = -Math.abs(selectedIndex * (viewPortWidth - 48));

    return `transform: translate3d(${wrapOffset}px, 0, 0); -webkit-transform: translate3d(${wrapOffset}px, 0, 0); visibility: visible;`.htmlSafe();
  }.property('selectedIndex'),

  transitionEvents: function () {
    var namespace = Ember.guidFor(this);
    var evts = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd'];
    return evts.map(str => { return `${str}.${namespace}`; }).join(' ');
  }.property(),

  didInsertElement: function() {
    var transitionEvents = this.get('transitionEvents');
    var $wrap = this.$('.swipe__wrap');

    //bind handlers
    this.boundResizeHandler = run.bind(this, 'resizeHandler');
    this.boundPanEndHandler = run.bind(this, 'panEnd');
    this.$(window).on('resize', this.boundResizeHandler);
    this.$(window).on('panend', this.boundPanEndHandler);
    $wrap.on(transitionEvents, run.bind(this, 'transitionEnd'));

    this.set('xPosStart', $wrap.offset().left - 30);

    //init viewport
    run.once(this, 'resizeHandler');
    this.sendAction('setSelectedIndex', this.get('selectedIndex'));
  },

  willDestroyElement: function () {
    var transitionEvents = this.get('transitionEvents');

    this.$(window).off('resize', this.boundResizeHandler);
    this.$(window).off('panend', this.boundPanEndHandler);
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
      webkitTransform: `translate3d(${wrapOffset}px, 0, 0)`,
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

  panEnd: panEndHandler,

  panLeft: horizontalPanHandler,

  panRight: horizontalPanHandler,

  panStart: function() {
    this.set('isPanning', true);
  },

  actions: {
    setSelectedIndex: function (index) {
      this.sendAction('setSelectedIndex', index);
    }
  }
});
