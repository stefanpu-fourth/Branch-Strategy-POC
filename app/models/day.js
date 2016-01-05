import Ember from 'ember';
import Shift from './shift';

let Day = Ember.Object.extend({
  // shiftDate is the date for this day's shifts (naming carried over from rota-schedule)
  // TODO: consider changing to more sensible name
  shiftDate: null,
  shifts: [],
  displayTypes: [],

  hasDisplayableType: Ember.computed.bool('displayTypes.length'),

  overlappingShifts: function() {
    const shifts = this.get('shifts') || [];
    let overlaps = [];

    shifts.forEach(function(shift, index) {
      const endTime = shift.get('endAsMinutes');
      const overlapping = shifts.filter((innerShift, innerIndex) => (
        (innerIndex > index) && (endTime > innerShift.get('startAsMinutes'))
      ));

      if (overlapping.length > 0) {
        // we've found overlaps, so make an overlap item
        overlaps.push({
          startAsMinutes: Math.min(...overlapping.mapBy('startAsMinutes')),
          endAsMinutes: Math.min(endTime, ...overlapping.mapBy('endAsMinutes')),
          shifts: [shift, ...overlapping],
          meta: shift.meta
        });
      }
    });

    return overlaps;
  }.property('shifts.[]'),

  shiftDateAsMoment: function() {
    return moment(this.get('shiftDate'));
  }.property('shiftDate'),

  getNextShiftFromMoment(now, dayBefore = now.clone().subtract(1, 'day')) {
    const dayDate = this.get('shiftDateAsMoment');

    if (now.isSame(dayDate, 'day') || dayBefore.isSame(dayDate, 'day')) {
      // as it's the same day, or the day before, does a shift end after current time?
      const shifts = this.shifts;

      for (let shiftIndex = 0; shiftIndex < shifts.length; shiftIndex++) {
        const shift = shifts[shiftIndex];
        const endTime = moment(shift.get('end'), 'HH:mm');
        const endCheckTime = dayDate.clone().hour(endTime.hour()).minute(endTime.minute());

        // if the shift spans midnight we need to add a day
        if (shift.get('endAsMinutes') < shift.get('startAsMinutes')) {
          endCheckTime.add(1, 'days');
        }

        if (endCheckTime.isAfter(now)) {
          return shift;
        }
      }
    } else if (now.isBefore(dayDate, 'day') && (this.shifts.length > 0)) {
      return this.shifts[0];
    }
  }
});

Day.reopenClass({
  daysFromSchedules(rotaSchedules, meta = rotaSchedules.get('meta')) {
    const scheduleDates = new Set(rotaSchedules.mapBy('shiftDate').map(d => d.valueOf()));

    return [...scheduleDates].map(date => {
      const scheduleDate = moment(date);
      const schedules = rotaSchedules.filter(schedule => (
        schedule.get('shiftDateAsMoment').isSame(scheduleDate, 'day')
      ));

      // gather shifts and displayTypes for day from all matching schedules
      let shifts = [];
      let displayTypes = new Set();

      schedules.forEach(schedule => {
        const scheduleShifts = Shift.shiftsFromSchedule(schedule, meta);

        // displayTypes only added if there's no shifts to display
        if (schedule.get('isNotRota') && (scheduleShifts.length === 0)) {
          displayTypes.add(schedule.get('type'));
        }

        shifts.push(...scheduleShifts);
      });

      return Day.create({
        shiftDate: schedules[0].get('shiftDate'),
        shifts: shifts.sortBy('startAsMinutes'),
        displayTypes: [...displayTypes]
      });
    });
  }
});

export default Day;
