import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  classNames: ['rota__day-row'],

  classNameBindings: ['isInPast:rota__past', 'isSelected:rota__selected'],

  shiftDateAsMoment: function() {
    return moment(this.get('day.shiftDate'));
  }.property(),

  isSelected: function() {
    // return true if the day's shifts array contains the selected shift
    var shifts = this.get('day.shifts');
    if (shifts) {
      return shifts.indexOf(this.get('selectedShift')) !== -1;
    } else {
      return false;
    }
  }.property('selectedShift', 'day'),

  isInPast: function() {
    return this.get('shiftDateAsMoment').isBefore(moment().startOf('day'));
  }.property(),

  isNotRota: function() {
    var type = this.get('day.type');

    var onOff = /^o(n|ff)$/i;

    return !(onOff.test(type));
  }.property('day.type')
});
