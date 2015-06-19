import Ember from 'ember';

var run = Ember.run;
var horizontalPanHandler = function(e) {
  if (!this.isPanning) {
    return;
  }
  var evt = e.originalEvent;
  var gesture = evt.gesture;
  var deltaX = gesture.deltaX;
  var deltaY = gesture.deltaY;

  if (this.isMoving || Math.abs(deltaY) > Math.abs(deltaX)) {
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
    if (index !== Math.max(this.get('collection.length') - 1, 0)) {
      index++;
    }
  } else if (currentDelta > 0) {
    if (index !== 0) {
      index--;
    }
  }

  if (index !== selectedIndex) {
    ga('send', 'event', 'carousel', 'swipe', 'Swipe container');
    this.sendAction('setSelectedIndex', index);
  }
};

export default Ember.Component.extend({

  classNames: ['swipe-container'],

  collection: null,
  tabPropertyKey: null,
  selectedIndex: null,
  itemSpacing: 16,

  setTripleSpacing: function() {
    this.tripleSpacing = this.itemSpacing * 3;
  }.observes('itemSpacing'),

  tripleSpacing: 16 * 3,

  setMaxOffset: function() {
    // we can't entirely guarantee when tripleSpacing will get updated, so do that calc inside here
    this.maxOffset = -(Math.max(this.get('collection.length') - 1, 0) * (this.viewPortWidth - (this.itemSpacing * 3)));
  }.observes('itemSpacing', 'collection', 'collection.length', 'viewPortWidth'),

  maxOffset: 0,

  deltaX: 0,
  viewPortWidth: 0,

  isMoving: false,
  isPanning: false,

  wrapStyles: function () {
    var selectedIndex = this.selectedIndex || 0;

    var wrapOffset = -(selectedIndex * (this.viewPortWidth - this.tripleSpacing)) + this.deltaX;

    // Rubber-banding...
    if (wrapOffset > 0) {
      wrapOffset = wrapOffset / 2;
    } else if (wrapOffset < this.maxOffset) {
      wrapOffset = this.maxOffset + ((wrapOffset - this.maxOffset) / 2);
    }

    return `transform: translate3d(${wrapOffset}px, 0, 0);
      -webkit-transform: translate3d(${wrapOffset}px, 0, 0);`.htmlSafe();
  }.property('selectedIndex', 'viewPortWidth', 'deltaX', 'itemSpacing'),

  isFirst: function () {
    return this.get('selectedIndex') === 0;
  }.property('selectedIndex'),

  isLast: function () {
    return this.get('selectedIndex') === Math.max(this.get('collection.length') - 1, 0);
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
    var $wrap = this.$('.swipe-container--wrap');
    var $window = this.$(window);
    var $arrows = this.$('.swipe-container--arrow');

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
    this.sendAction('setSelectedIndex', this.get('selectedIndex'));
  },

  willDestroyElement: function () {
    var transitionEvents = this.get('transitionEvents');
    var $window = this.$(window);

    $window.off('resize', this.boundResizeHandler);
    $window.off('panend', this.boundPanEndHandler);
    $window.off('keydown', this.boundKeydownHandler);
    this.$('.swipe-container--wrap').off(transitionEvents);
    this.$('.swipe-container--arrow').off('panstart');
  },

  resizeHandler: function() {
    // automatically work out what our item spacing should be from the size of the container margins
    var margins = this.$().innerWidth() - this.$('.swipe-container--wrap').innerWidth();
    this.set('itemSpacing', margins / 3);

    this.set('viewPortWidth', this.$().innerWidth());
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
        ga('send', 'event', 'carousel', 'click', 'Swipe arrow');
        this.sendAction('setSelectedIndex', this.get('selectedIndex') - 1);
      }
    },

    nextPage: function () {
      if (!this.get('isLast') && this.get('moreThanOne')) {
        ga('send', 'event', 'carousel', 'click', 'Swipe arrow');
        this.sendAction('setSelectedIndex', this.get('selectedIndex') + 1);
      }
    }
  }
});
