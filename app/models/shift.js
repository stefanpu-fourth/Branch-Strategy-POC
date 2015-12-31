import Ember from 'ember';

let Shift = Ember.Object.extend({
  jobTitle: null,
  type: null,
  location: null,
  start: null,
  end: null,

  convertToMinutes: function(time) {
    const hours   = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(3, 5), 10);

    return (hours * 60) + minutes;
  },

  startAsMinutes: function() {
    return this.convertToMinutes(this.get('start'));
  }.property('start'),

  endAsMinutes: function() {
    return this.convertToMinutes(this.get('end'));
  }.property('end')
});

Shift.reopenClass({
  shiftsFromSchedule(rotaSchedule, meta) {
    const times = rotaSchedule.get('shiftTimes');
    meta = meta || rotaSchedule.get('meta');
    let newShifts = [];

    if (times) {
      times.forEach((startTime, index) => {
        if ((index % 2) === 0) {
          const endTime = times[index + 1];
          if (startTime !== endTime) {
            newShifts.push(Shift.create(Ember.merge(rotaSchedule.getProperties('jobTitle', 'type', 'location'), {
              start: startTime,
              end: endTime,
              meta: meta
            })));
          }
        }
      });
    }

    return newShifts;
  }
});

export default Shift;
