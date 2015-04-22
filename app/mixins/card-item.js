import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'section',
  classNames: ['card'],
  classNameBindings: ['isActive:card--active'],
  attributeBindings: ['style'],

  index: null,
  selectedIndex: null,

  flipped: false,
  cardSpacing: 24,
  width: 1000,

  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

  style: function() {
    var margin = this.get('cardSpacing') / 2;
    return `margin-left: ${margin}px; margin-right: ${margin}px; width: ${this.get('width')}px`.htmlSafe();
  }.property('cardSpacing', 'width'),

  willInsertElement: function() {
    var parent = this.get('parentView');
    if (parent) {
      var spacing = parent.get('cardSpacing');
      if (spacing !== undefined) {
        this.set('cardSpacing', spacing);
      }
    } else {
      console.log("parent not set at willInsertElement");
    }
  },

  didInsertElement: function() {
    //bind handlers
    this.boundResizeHandler = Ember.run.bind(this, 'resizeHandler');
    this.$(window).on('resize', this.boundResizeHandler);

    //init viewport
    Ember.run.once(this, 'resizeHandler');
  },

  willDestroyElement: function () {
    this.$(window).off('resize', this.boundResizeHandler);
  },

  resizeHandler: function() {
    this.set('width', Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - (this.get('cardSpacing') * 4));
  },

  actions: {
    flip: function () {
      this.toggleProperty('flipped');
    }
  }
});
