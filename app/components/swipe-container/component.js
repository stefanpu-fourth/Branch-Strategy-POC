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
  var selectedIndex;

  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    this.set('deltaX', 0);
    return;
  }

  $wrap = this.$('.swipe__wrap');
  $cards = $wrap.children('.card');

  currentDelta = deltaX || this.get('deltaX');
  selectedIndex = index = this.get('selectedIndex');

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

  if (index !== selectedIndex) {
    this.set('isMoving', true);
    this.sendAction('setSelectedIndex', index);
  }
};

export default Ember.Component.extend({

  classNames: ['swipe'],

  collection: null,
  tabPropertyKey: null,
  selectedIndex: null,
  cardSpacing: 24,

  deltaX: 0,
  viewPortWidth: 0,

  isMoving: false,
  isPanning: false,

  wrapStyles: function () {
    var selectedIndex = this.get('selectedIndex') || 0;
    var viewPortWidth = this.get('viewPortWidth');
    var deltaX = this.get('deltaX');
    var cardSpacing = this.get('cardSpacing');
    var wrapOffset = -Math.abs(selectedIndex * (viewPortWidth - (cardSpacing * 3))) + deltaX;
    var margin = cardSpacing * 1.5;

    return `transform: translate3d(${wrapOffset}px, 0, 0);
      -webkit-transform: translate3d(${wrapOffset}px, 0, 0);
      margin-left: ${margin}px;
      visibility: visible;`.htmlSafe();
  }.property('selectedIndex', 'viewPortWidth', 'deltaX', 'cardSpacing'),

  transitionEvents: function () {
    var namespace = Ember.guidFor(this);
    var evts = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd'];
    return evts.map(str => { return `${str}.${namespace}`; }).join(' ');
  }.property(),

  didInsertElement: function() {
    var transitionEvents = this.get('transitionEvents');
    var $wrap = this.$('.swipe__wrap');
    var $window = this.$(window);

    //bind handlers
    this.boundResizeHandler = run.bind(this, 'resizeHandler');
    this.boundPanEndHandler = run.bind(this, 'panEnd');
    $window.on('resize', this.boundResizeHandler);
    $window.on('panend', this.boundPanEndHandler);
    $wrap.on(transitionEvents, run.bind(this, 'transitionEnd'));

    //init viewport
    run.once(this, 'resizeHandler');
    this.sendAction('setSelectedIndex', this.get('selectedIndex'));
  },

  willDestroyElement: function () {
    var transitionEvents = this.get('transitionEvents');
    var $window = this.$(window);

    $window.off('resize', this.boundResizeHandler);
    $window.off('panend', this.boundPanEndHandler);
    this.$('.swipe__wrap').off(transitionEvents);
  },

  getViewPortWidth: function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },

  resizeHandler: function() {
    this.set('viewPortWidth', Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
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
