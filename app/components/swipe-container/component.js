import Ember from 'ember';

var run = Ember.run;
var horizontalPanHandler = function(e) {
  if (!this.get('isPanning')) {
    return;
  }
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
  var currentDelta = deltaX || this.get('deltaX');
  this.set('deltaX', 0);

  if (currentDelta !== 0) {
    this.set('isMoving', true);
  }

  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    return;
  }

  var selectedIndex = this.get('selectedIndex');
  var index = selectedIndex;

  if (currentDelta < 0) {
    if (index !== this.get('collection.length') - 1) {
      index++;
    }
  } else if (currentDelta > 0) {
    if (index !== 0) {
      index--;
    }
  }

  if (index !== selectedIndex) {
    this.sendAction('setSelectedIndex', index);
  }
};

export default Ember.Component.extend({

  classNames: ['swipe'],

  collection: null,
  tabPropertyKey: null,
  selectedIndex: null,
  cardSpacing: 16,

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

  isFirst: function () {
    return this.get('selectedIndex') === 0;
  }.property('selectedIndex'),

  isLast: function () {
    return this.get('selectedIndex') === (this.get('collection.length') - 1);
  }.property('selectedIndex', 'collection'),

  moreThanOne: function() {
    return this.get('collection.length') > 1;
  }.property('collection.length').volatile(),

  isTouch: function () {
    return (('ontouchstart' in window) || (window.navigator.MaxTouchPoints > 0) || (window.navigator.msMaxTouchPoints > 0));
  }.property(),

  transitionEvents: function () {
    var namespace = Ember.guidFor(this);
    var evts = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd'];
    return evts.map(str => { return `${str}.${namespace}`; }).join(' ');
  }.property(),

  didInsertElement: function() {
    var transitionEvents = this.get('transitionEvents');
    var $wrap = this.$('.swipe--wrap');
    var $window = this.$(window);
    var $arrows = this.$('.swipe--arrow');

    //bind handlers
    this.boundResizeHandler = run.bind(this, 'resizeHandler');
    this.boundPanEndHandler = run.bind(this, 'panEnd');
    this.boundKeydownHandler = run.bind(this, 'keydownHandler');
    $window.on('resize', this.boundResizeHandler);
    $window.on('panend', this.boundPanEndHandler);
    $window.on('keydown', this.boundKeydownHandler);
    $wrap.on(transitionEvents, run.bind(this, 'transitionEnd'));
    $arrows.on('panstart', function(evt) {
      evt.stopPropagation();
    });

    //init viewport
    run.once(this, 'resizeHandler');
    this.sendAction('setSelectedIndex');
  },

  willDestroyElement: function () {
    var transitionEvents = this.get('transitionEvents');
    var $window = this.$(window);

    $window.off('resize', this.boundResizeHandler);
    $window.off('panend', this.boundPanEndHandler);
    $window.off('keydown', this.boundKeydownHandler);
    this.$('.swipe--wrap').off(transitionEvents);
    this.$('.swipe--arrow').off('panstart');
  },

  resizeHandler: function() {
    this.set('viewPortWidth', this.$(window).width());
  },

  pageChanging: function() {
    this.set('isMoving', true);
  }.observes('selectedIndex'),

  transitionEnd: function() {
    this.set('isMoving', false);
  },

  panEnd: panEndHandler,

  panLeft: horizontalPanHandler,

  panRight: horizontalPanHandler,

  panStart: function() {
    this.set('isPanning', true);
  },

  keydownHandler: function(e) {
    if (e.keyCode === 37) {
      this.send('prevPage');
    } else if (e.keyCode === 39) {
      this.send('nextPage');
    }
  },

  actions: {
    setSelectedIndex: function (index) {
      this.sendAction('setSelectedIndex', index);
    },

    prevPage: function () {
      if (!this.get('isFirst') && this.get('moreThanOne')) {
        this.sendAction('setSelectedIndex', this.get('selectedIndex') - 1);
      }
    },

    nextPage: function () {
      if (!this.get('isLast') && this.get('moreThanOne')) {
        this.sendAction('setSelectedIndex', this.get('selectedIndex') + 1);
      }
    }
  }
});
