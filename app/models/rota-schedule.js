import DS from 'ember-data';
import Ember from 'ember';

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
  // TODO - probably means some functionality needs to move here.

  // TODO - this logic is flawed and reliant upon particular words
  // this should probably be moved to a back-end provided field
  isNotRota: function() {
    var type = this.get('type');

    var onOff = /^(on|off|unavailable)$/i;

    return !(onOff.test(type));
  }.property('type'),

  calculateShifts: function() {
    var times = this.get('shiftTimes');
    let newShifts = [];
    if (times) {
      newShifts = times.map((startTime, index) => {
        if ((index % 2) === 0) {
          var endTime = times[index + 1];
          if (startTime !== endTime) {
            return Ember.merge(this.getProperties('jobTitle', 'type', 'isNotRota', 'location'), {
              start: startTime,
              end: endTime
            });
          }
        }

        return undefined;
      });
    }
    this.set('shifts', newShifts.compact());
  },

  shiftDateAsMoment: function() {
    return moment(this.get('shiftDate'));
  }.property('shiftDate'),

  isBetweenMoments: function(m1, m2) {
    return this.get('shiftDateAsMoment').isBetween(m1, m2);
  }
});
