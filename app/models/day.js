import Ember from 'ember';
import Shift from './shift';

let Day = Ember.Object.extend({
  shiftDate: null,
  rotaStart: null,
  shifts: [],
  displayTypes: null,

  hasDisplayableType: Ember.computed.bool('displayTypes.length'),

  overlappingShifts: function() {
    let overlaps = [];
    const shifts = this.get('shifts') || [];

    shifts.forEach(function(shift, index) {
      const endTime = shift.get('endAsMinutes');
      const overlapping = shifts.filter(function(innerShift, innerIndex) {
        return (innerIndex > index) && (endTime > innerShift.get('startAsMinutes'));
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
  }.property('shiftDate')
});

Day.reopenClass({
  daysFromSchedules(rotaSchedules, meta) {
    let scheduleDates = new Set(rotaSchedules.mapBy('shiftDate').map(d => d.valueOf()));

    return [...scheduleDates].map(date => {
      const scheduleDate = moment(date);
      const schedules = rotaSchedules.filter((schedule) => {
        return schedule.get('shiftDateAsMoment').isSame(scheduleDate, 'day');
      });

      // make a new Day from first schedule
      let day = Day.create(schedules[0].getProperties('shiftDate', 'rotaStart'));

      // gather shifts and displayTypes for day from all matching schedules
      let shifts = [];
      let displayTypes = new Set();

      schedules.forEach(schedule => {
        let scheduleShifts = Shift.shiftsFromSchedule(schedule, meta);

        // displayTypes only added if there's no shifts to display
        if (schedule.get('isNotRota') && (scheduleShifts.length === 0)) {
          displayTypes.add(schedule.get('type'));
        }

        shifts.push(...scheduleShifts);
      });

      // set shifts and displayTypes on day
      day.setProperties({ shifts: shifts.sortBy('startAsMinutes'), displayTypes: [...displayTypes] });

      return day;
    });
  }
});

export default Day;
