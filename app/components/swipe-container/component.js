import Ember from 'ember';

var run = Ember.run;

/**
  @class SwipeContainer
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({

  classNames: ['swipe-container'],

  // public properties
  collection: null,
  tabPropertyKey: null,
  selectedIndex: null,
  swipeThreshold: 20,     // number of pixels after which we register/descide on swipe/scroll

  // other properties
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

  didInsertElement() {
    var $window = this.$(window);

    //bind handlers
    this.boundResizeHandler = run.bind(this, 'resizeHandler');
    this.boundKeydownHandler = run.bind(this, 'keydownHandler');
    $window.on('resize', this.boundResizeHandler);
    $window.on('keydown', this.boundKeydownHandler);

    if (this.get('isTouch')) {
      this.boundTouchStart = run.bind(this, 'touchstartHandler');
      this.boundTouchMove = run.bind(this, 'touchmoveHandler');
      this.boundTouchEnd = run.bind(this, 'touchendHandler');
      this.element.addEventListener('touchstart', this.boundTouchStart, false);
      this.element.addEventListener('touchmove', this.boundTouchMove, false);
      this.element.addEventListener('touchend', this.boundTouchEnd, false);
      this.element.addEventListener('touchcancel', this.boundTouchEnd, false);
    }

    //init viewport
    run.scheduleOnce('afterRender', () => {
      this.resizeHandler();
      this.sendAction('setSelectedIndex', this.get('selectedIndex'));
    });
  },

  willDestroyElement() {
    var $window = this.$(window);
    $window.off('resize', this.boundResizeHandler);
    $window.off('keydown', this.boundKeydownHandler);

    if (this.get('isTouch')) {
      this.element.removeEventListener('touchstart', this.boundTouchStart, false);
      this.element.removeEventListener('touchmove', this.boundTouchMove, false);
      this.element.removeEventListener('touchend', this.boundTouchEnd, false);
      this.element.removeEventListener('touchcancel', this.boundTouchEnd, false);
    }
  },

  resizeHandler() {
    // automatically work out what our item spacing should be from the size of the container margins
    var margins = this.$().innerWidth() - this.$('.swipe-container--wrap').innerWidth();
    this.set('itemSpacing', margins / 3);

    this.set('viewPortWidth', this.$().innerWidth());
  },

  pageChanging: function() {
    this.set('isDragging', false);
  }.observes('selectedIndex'),

  touchstartHandler(e) {
    this.startX = e.targetTouches[0].clientX;
    this.startY = e.targetTouches[0].clientY;
    this.set('isPanning', true);
    this.set('deltaX', 0);
    this.reallyDragging = false;
  },

  touchmoveHandler(e) {
    if (!this.get('isPanning')) {
      return;
    }
    var deltaX = e.targetTouches[0].clientX - this.startX;
    var deltaY = e.targetTouches[0].clientY - this.startY;
    var absX = Math.abs(deltaX);

    if (!this.reallyDragging) {
      if (absX > this.get('swipeThreshold')) {
        if (Math.abs(deltaY) > absX) {
          // we're moving more vertical than horizontal so assume this is a scroll
          this.set('isPanning', false);
          this.set('deltaX', 0);
          return;
        } else {
          this.reallyDragging = true;
        }
      }
    }

    if (this.reallyDragging) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.set('deltaX', deltaX);
  },

  touchendHandler(e) {
    if (!this.get('isPanning')) {
      return;
    }

    this.set('isPanning', false);

    if (this.reallyDragging) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.reallyDragging = false;

    var deltaX = this.get('deltaX');

    run.next(() => {
      // make sure our adjustments come after isPanning has been cleared
      this.set('deltaX', 0);

      if (Math.abs(deltaX) < this.get('swipeThreshold')) {
        // swipe under threshold, so don't change page
        return;
      }

      var selectedIndex = this.get('selectedIndex');
      var index = selectedIndex;

      if (deltaX < 0) {
        if (index !== Math.max(this.get('collection.length') - 1, 0)) {
          index++;
        }
      } else if (deltaX > 0) {
        if (index !== 0) {
          index--;
        }
      }

      if (index !== selectedIndex) {
        ga('send', 'event', 'carousel', 'swipe', 'Swipe container');
        this.sendAction('setSelectedIndex', index);
      }
    });
  },

  keydownHandler(e) {
    if (e.keyCode === 37) {
      this.send('prevPage');
    } else if (e.keyCode === 39) {
      this.send('nextPage');
    }
  },

  actions: {
    setSelectedIndex(index) {
      this.sendAction('setSelectedIndex', index);
    },

    prevPage() {
      if (!this.get('isFirst') && this.get('moreThanOne')) {
        ga('send', 'event', 'carousel', 'click', 'Swipe arrow');
        this.sendAction('setSelectedIndex', this.get('selectedIndex') - 1);
      }
    },

    nextPage() {
      if (!this.get('isLast') && this.get('moreThanOne')) {
        ga('send', 'event', 'carousel', 'click', 'Swipe arrow');
        this.sendAction('setSelectedIndex', this.get('selectedIndex') + 1);
      }
    }
  }
});
