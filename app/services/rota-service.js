import Ember from 'ember';
import Week from 'ess/models/week';

export default Ember.Service.extend({

  getRotaWeeks: function(schedules, meta) {
    return Week.weeksFromSchedules(schedules, meta);
  },

  _shiftMatches: function(shift, date, shiftDateAsMoment) {
    let startDateTime = moment(shift.start, "HH:mm");
    let endDateTime = moment(shift.end, "HH:mm");

    let endCheckTime = shiftDateAsMoment.clone().hour(endDateTime.hour());
    endCheckTime.minute(endDateTime.minute());

    if (endDateTime.isBefore(startDateTime)) {
      endCheckTime.add(1, 'days');
    }

    return endCheckTime.isAfter(date);
  },

  getNextShiftFromWeeks(weeks, date = Date.now()) {
    // gather all the shifts from the weeks after the date
    let checkMoment = moment(date);
    let shifts = weeks.reduce(
      (prev, week) => {
        return prev.concat(week.days.reduce(
          (prev, day) => {
            let dayMoment = day.get('shiftDateAsMoment');
            if (dayMoment.isSame(checkMoment, 'day')) {
              // find only shifts after current time
              return prev.concat(day.shifts.filter(shift => this._shiftMatches(shift, date, dayMoment)));
            } else if (dayMoment.isAfter(checkMoment)) {
              return prev.concat(day.shifts);
            }
            return prev;
          }, [])
        );
      },
      []
    );

    return shifts[0];
  },

  // utility method to check if a shift is in an overlap
  // and return the first overlap the shift belongs to
  findOverlapForShift: function(weeks, shift) {
    var overlapFilter = function(overlap) {
      return overlap.shifts.contains(shift);
    };
    for (let i = 0; i < weeks.length; i++) {
      let week = weeks[i];
      let days = week.get('days');
      for (let day = 0; day < days.length; day++) {
        // check the shift to see if it's in the overlappingShifts for the day
        let overlaps = days[day].get('overlappingShifts').filter(overlapFilter);
        if (overlaps && (overlaps.length !== 0)) {
          return overlaps[0];
        }
      }
    }
  },

  // utility method to work out current week from a list of weeks
  getWeekIndexForDate: function(weeks, date = Date.now()) {
    if (weeks.length === 0) {
      return 0;
    }

    var weekIndex = weeks.indexOf(this.findWeekForDate(weeks, date));
    if (weekIndex === -1) {
      date = moment(date);
      if (date.isBefore(weeks[0].get('start'))) {
        weekIndex = 0;
      } else {
        weekIndex = weeks.length - 1;
      }
    }
    return weekIndex;
  },

  findWeekForDate: function(weeks, date = Date.now()) {
    date = moment(date);
    var foundWeek;
    weeks.forEach(week => {
      if (date.isBetween(
        moment(week.get('start')).subtract(1, 'ms'),
        moment(week.get('end')).add(1, 'day'),
        'day')
      ) {
        foundWeek = week;
      }
    });
    return foundWeek;
  }
});
