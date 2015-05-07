import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

var Shift = Ember.Object.extend({
  jobTitle: null,
  type: null,
  location: null,
  start: null,
  end: null,

  convertToMinutes: function(time) {
    var hours   = parseInt(time.substring(0, 2));
    var minutes = parseInt(time.substring(3, 5));

    return (hours * 60) + minutes;
  },

  startAsMinutes: function() {
    return this.convertToMinutes(this.get('start'));
  }.property('start'),

  endAsMinutes: function() {
    return this.convertToMinutes(this.get('end'));
  }.property('end')
});

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
    var times = this.get('shiftTimes');
    let newShifts = [];
    if (times) {
      newShifts = times.map((startTime, index) => {
        if ((index % 2) === 0) {
          var endTime = times[index + 1];
          if (startTime !== endTime) {
            return Shift.create(Ember.merge(this.getProperties('jobTitle', 'type', 'location'), {
              start: startTime,
              end: endTime,
              meta: meta
            }));
          }
        }

        return undefined;
      });
    }
    this.set('shifts', newShifts.compact());
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
          shifts: [].concat(shift).concat(overlapping)
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
