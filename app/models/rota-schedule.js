import DS from 'ember-data';

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

  calculateShifts: function() {
    var times = this.get('shiftTimes');
    if (times) {
      let newShifts = times.map((startTime, index) => {
        if ((index % 2) === 0) {
          var endTime = times[index + 1];
          if (startTime !== endTime) {
            return {
              start: startTime,
              end: endTime,
              location: this.get('location'),
              jobTitle: this.get('jobTitle')
            };
          }
        }

        return undefined;
      });
      this.set('shifts', newShifts.compact());
    }
  },

  shiftDateAsMoment: function() {
    return moment(this.get('shiftDate'));
  }.property('shiftDate'),

  isBetweenMoments: function(m1, m2) {
    return this.get('shiftDateAsMoment').isBetween(m1, m2);
  }
});
