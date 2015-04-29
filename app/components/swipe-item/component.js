import Ember from 'ember';

var run = Ember.run;

export default Ember.Component.extend({

  tagName: 'div',
  classNames: ['swipe-item'],
  classNameBindings: ['isActive:-active'],
  attributeBindings: ['style'],

  index: null,
  selectedIndex: null,

  itemSpacing: 24,
  width: 1000,

  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

  style: function() {
    var margin = this.get('itemSpacing') / 2;
    return `margin-left: ${margin}px; margin-right: ${margin}px; width: ${this.get('width')}px`.htmlSafe();
  }.property('itemSpacing', 'width'),

  willInsertElement: function() {
    var parent = this.get('parentView');
    if (parent) {
      var spacing = parent.get('itemSpacing');
      if (spacing !== undefined) {
        this.set('itemSpacing', spacing);
      }
    }
  },

  didInsertElement: function() {
    //bind handlers
    this.boundResizeHandler = run.bind(this, 'resizeHandler');
    this.$(window).on('resize', this.boundResizeHandler);

    //init viewport
    run.once(this, 'resizeHandler');
  },

  willDestroyElement: function () {
    this.$(window).off('resize', this.boundResizeHandler);
  },

  resizeHandler: function() {
    this.set('width', this.$(window).width() - (this.get('itemSpacing') * 4));
  }
});
