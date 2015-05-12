import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'div',
  classNames: ['swipe-item'],
  classNameBindings: ['isActive:-active'],
  attributeBindings: ['style'],

  index: null,
  selectedIndex: null,

  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

  style: function() {
    var margin = (this.get('parentView.itemSpacing') / 2) || 0;
    var width = this.get('parentView.viewPortWidth') - (margin * 8);
    return `margin-left: ${margin}px; margin-right: ${margin}px; width: ${width}px`.htmlSafe();
  }.property('parentView.itemSpacing', 'parentView.viewPortWidth')
});
