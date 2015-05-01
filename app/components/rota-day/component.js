import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  classNames: ['rota-day'],

  classNameBindings: ['isInPast:-past', 'isSelected:-active', 'dayModifier'],

  day: null,
  selectedShift: null,
  selectTarget: null,

  shiftDateAsMoment: function() {
    return moment(this.get('day.shiftDate'));
  }.property('day.shiftDate'),

  isSelected: function() {
    // return true if the day's shifts array contains the selected shift
    var shifts = this.get('day.shifts');
    if (shifts) {
      return shifts.indexOf(this.get('selectedShift')) !== -1;
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
  }.property('dayIndex'),

  isNotRota: function() {
    var type = this.get('day.type');

    var onOff = /^o(n|ff)$/i;

    return !(onOff.test(type));
  }.property('day.type')
});
