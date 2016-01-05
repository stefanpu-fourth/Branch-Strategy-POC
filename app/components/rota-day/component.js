import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'li',

  classNames: ['rota-day'],

  classNameBindings: ['isInPast:-past', 'isSelected:-active', 'dayModifier'],

  day: null,
  selectedShift: null,
  selectedOverlap: null,
  selectTarget: null,

  shiftDateAsMoment: computed.alias('day.shiftDateAsMoment'),

  isSelectedShift: function() {
    const selectedShift = this.get('selectedShift');
    if (selectedShift) {
      return this.get('day.shifts').indexOf(selectedShift) !== -1;
    } else {
      return false;
    }
  }.property('selectedShift', 'day.shifts'),

  isSelectedOverlap: function() {
    const selectedOverlap = this.get('selectedOverlap');
    if (selectedOverlap) {
      return this.get('day.overlappingShifts').indexOf(selectedOverlap) !== -1;
    } else {
      return false;
    }
  }.property('selectedOverlap', 'day.overlappingShifts'),

  isSelected: computed.or('isSelectedShift', 'isSelectedOverlap'),

  isInPast: function() {
    return moment().startOf('day').isAfter(this.get('shiftDateAsMoment'));
  }.property('shiftDateAsMoment'),

  dayModifier: function() {
    const dayIndex = parseInt(this.get('dayIndex'), 10) + 1;
    return '-day-' + dayIndex;
  }.property('dayIndex')
});
