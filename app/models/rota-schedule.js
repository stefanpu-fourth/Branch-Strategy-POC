import DS from 'ember-data';
import Ember from 'ember';
import Shift from './shift';

var attr = DS.attr;

export default DS.Model.extend({
  type: attr('string'),
  shiftDate: attr('date'),
  location: attr('string'),
  department: attr('string'),
  jobTitle: attr('string'),
  isMain: attr('boolean'),
  shiftTimes: attr(),
  rotaStart: attr('date'),
  rotaStartDayOfWeek: attr('number'),

  shifts: null, // populated after load by the rota service
  displayTypes: [],   // also populated after load
  // TODO - probably means some functionality needs to move here.

  hasDisplayableType: Ember.computed.bool('displayTypes.length'),

  // TODO - this logic is flawed and reliant upon particular words
  // this should probably be moved to a back-end provided field
  isNotRota: function() {
    var type = this.get('type');

    var onOff = /^(on|off|unavailable)$/i;

    return !(onOff.test(type));
  }.property('type'),

  calculateShifts: function(meta) {
    this.set('shifts', Shift.shiftsFromSchedule(this, meta));
  },

  overlappingShifts: function() {
    var overlaps = [];
    var shifts = this.get('shifts');

    shifts.forEach(function(shift, index) {
      var endTime = shift.get('endAsMinutes');
      var overlapping = shifts.filter(function(innerShift, innerIndex) {
        return innerIndex > index && (endTime > innerShift.get('startAsMinutes'));
      });
      if (overlapping.length > 0) {
        // we've found overlaps, so make an overlap item
        overlaps.push({
          startAsMinutes: Math.min(...overlapping.mapBy('startAsMinutes')),
          endAsMinutes: Math.min(endTime, ...overlapping.mapBy('endAsMinutes')),
          shifts: [].concat(shift).concat(overlapping),
          meta: shift.meta
        });
      }
    });

    return overlaps;
  }.property('shifts'),

  shiftDateAsMoment: function() {
    return moment(this.get('shiftDate'));
  }.property('shiftDate'),

  isBetweenMoments: function(m1, m2) {
    return this.get('shiftDateAsMoment').isBetween(m1, m2);
  }
});
