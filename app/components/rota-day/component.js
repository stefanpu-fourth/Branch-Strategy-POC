import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  classNames: ['rota-day'],

  classNameBindings: ['isInPast:-past', 'isSelected:-active', 'dayModifier'],

  day: null,
  selectedShift: null,
  selectedOverlap: null,
  selectTarget: null,

  shiftDateAsMoment: function() {
    return moment(this.get('day.shiftDate'));
  }.property('day.shiftDate'),

  isSelected: function() {
    // return true if the day's shifts array contains the selected shift
    var selectedShift = this.get('selectedShift');
    var selectedOverlap = this.get('selectedOverlap');
    if (selectedShift) {
      return this.get('day.shifts').indexOf(selectedShift) !== -1;
    } else if (selectedOverlap) {
      return this.get('day.overlappingShifts').indexOf(selectedOverlap) !== -1;
    } else {
      return false;
    }
  }.property('selectedShift', 'day.shifts'),

  isInPast: function() {
    return this.get('shiftDateAsMoment').isBefore(moment().startOf('day'));
  }.property('shiftDateAsMoment'),

  dayModifier: function() {
    var dayIndex = parseInt(this.get('dayIndex'), 10) + 1;
    return '-day-' + dayIndex;
  }.property('dayIndex')
});
