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
  shiftsFromSchedule(rotaSchedule, meta = rotaSchedule.get('meta')) {
    const times = rotaSchedule.get('shiftTimes');
    const newShifts = [];

    if (times) {
      times.forEach((start, index) => {
        if ((index % 2) === 0) {
          const end = times[index + 1];

          if (start !== end) {
            newShifts.push(Shift.create(Ember.merge(
              rotaSchedule.getProperties('jobTitle', 'type', 'location'),
              { start, end, meta }
            )));
          }
        }
      });
    }

    return newShifts;
  }
});

export default Shift;
