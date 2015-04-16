import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  classNameBindings: ['isInPast:rota__past', 'isSelected:rota__selected'],

  shiftDateAsMoment: function() {
    return moment(this.get('day.shiftDate'));
  }.property(),

  isSelected: function() {
    return Ember.isEqual(this.get('selectedDayIndex'), this.get('dayIndex'));
  }.property('selectedDayIndex', 'dayIndex'),

  isInPast: function() {
    return this.get('shiftDateAsMoment').isBefore(moment().startOf('day'));
  }.property(),

  isNotRota: function() {
    var type = this.get('day.type');

    var onOff = /^o(n|ff)$/i;

    return !(onOff.test(type));
  }.property('day.type')
});
