import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'a',
  classNames: [ 'notALink', 'swipe__tablink', 'swipe__tablink--payslip' ],
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
  }.property('item', 'propertyKey')
});
