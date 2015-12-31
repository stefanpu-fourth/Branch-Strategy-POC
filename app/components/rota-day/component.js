import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  classNames: ['rota-day'],

  classNameBindings: ['isInPast:-past', 'isSelected:-active', 'dayModifier'],

  day: null,
  selectedShift: null,
  selectedOverlap: null,
  selectTarget: null,

  shiftDateAsMoment: Ember.computed.alias('day.shiftDateAsMoment'),

  isSelectedShift: function() {
    var selectedShift = this.get('selectedShift');
    if (selectedShift) {
      return this.get('day.shifts').indexOf(selectedShift) !== -1;
    } else {
      return false;
    }
  }.property('selectedShift', 'day.shifts'),

  isSelectedOverlap: function() {
    var selectedOverlap = this.get('selectedOverlap');
    if (selectedOverlap) {
      return this.get('day.overlappingShifts').indexOf(selectedOverlap) !== -1;
    } else {
      return false;
    }
  }.property('selectedOverlap', 'day.overlappingShifts'),

  isSelected: Ember.computed.or('isSelectedShift', 'isSelectedOverlap'),

  isInPast: function() {
    return moment().startOf('day').isAfter(this.get('shiftDateAsMoment'));
  }.property('shiftDateAsMoment'),

  dayModifier: function() {
    var dayIndex = parseInt(this.get('dayIndex'), 10) + 1;
    return '-day-' + dayIndex;
  }.property('dayIndex')
});
