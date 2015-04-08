import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'a',
  classNames: [ 'notALink', 'swipe__tablink' ],
  classNameBindings: [ 'isActive:swipe__tablink--active' ],

  item: null,
  propertyKey: null,
  index: null,
  selectedIndex: null,

  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

  prop: function () {
    var props = this.getProperties('item', 'propertyKey');
    return props.item.get(props.propertyKey);
  }.property('item', 'propertyKey'),

  tap: function () {
    this.sendAction('setSelectedIndex', this.get('index'));
  }
});
