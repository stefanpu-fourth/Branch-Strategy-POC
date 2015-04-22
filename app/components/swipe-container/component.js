import Ember from 'ember';

var run = Ember.run;
var horizontalPanHandler = function(e) {
  var evt = e.originalEvent;
  var gesture = evt.gesture;
  var deltaX = gesture.deltaX;
  var deltaY = gesture.deltaY;
  var isMoving = this.get('isMoving');

  if (isMoving || Math.abs(deltaY) > Math.abs(deltaX)) {
    return;
  }

  this.set('deltaX', deltaX);
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

  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    this.set('deltaX', 0);
    return;
  }

  $cards = $wrap.children('.card');

  currentDelta = deltaX || this.get('deltaX');
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

  this.set('deltaX', 0);

  if (index !== this.get('selectedIndex')) {
    this.set('isMoving', true);
    this.sendAction('setSelectedIndex', index);
  }
};

export default Ember.Component.extend({

  classNames: ['swipe'],

  collection: null,
  tabPropertyKey: null,
  selectedIndex: null,

  deltaX: 0,
  viewPortWidth: 0,

  isMoving: false,
  isPanning: false,

  wrapStyles: function () {
    var selectedIndex = this.get('selectedIndex') || 0;
    var viewPortWidth = this.get('viewPortWidth');
    var deltaX = this.get('deltaX');
    var wrapOffset = -Math.abs(selectedIndex * (viewPortWidth - 46)) + deltaX;

    return `transform: translate3d(${wrapOffset}px, 0, 0); -webkit-transform: translate3d(${wrapOffset}px, 0, 0); visibility: visible;`.htmlSafe();
  }.property('selectedIndex', 'viewPortWidth', 'deltaX'),

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

  resizeHandler: function() {
    var $wrap = this.$('.swipe__wrap');
    var $cards = $wrap.children('.card');
    var viewPortWidth = this.getViewPortWidth();

    this.set('viewPortWidth', viewPortWidth);

    $cards.css('width', viewPortWidth - 64);    // use of css here feels dodgy
  },

  transitionEnd: function() {
    this.set('isMoving', false);
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
