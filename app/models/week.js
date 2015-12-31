import Ember from 'ember';
import i18n from 'ess/i18n';
import Day from 'ess/models/day';

var Week = Ember.Object.extend({
  start: null,
  days: [],
  meta: null,

  end: function() {
    return moment(this.get('start')).add(6, 'day');
  }.property('start'),

  formattedDateRange: function() {
    const dayMonthFormat = i18n.t('dateFormats.dayMonth');
    return moment(this.get('start')).format(dayMonthFormat) + " - " + moment(this.get('end')).format(dayMonthFormat);
  }.property('start', 'end')
});

Week.reopenClass({
  weeksFromSchedules(rotaSchedules, meta) {
    var rotaWeeks = [];
    meta = meta || rotaSchedules.get('meta');

    // get a unique list of our rotaStart dates from our rotaSchedule records
    var weekStarts = rotaSchedules.mapBy('rotaStart').map(d => moment(d).valueOf()).uniq().sortBy();

    weekStarts.forEach(function(weekDate) {
      let weekStart = moment(weekDate);
      let filterStart = weekStart.clone().subtract(1, 'days');
      let end = weekStart.clone().add(7, 'days');

      // get only rotaSchedule records for this week
      let schedulesForDate = rotaSchedules.filter(s => {
        return s.isBetweenMoments(filterStart, end);
      });

      // process those into day model objects
      let days = Day.daysFromSchedules(schedulesForDate, meta);

      // add in any days that might be missing
      var checkDay = weekStart.clone();
      while (checkDay.isBefore(end)) {
        // find out if we've got this day
        let foundDays = days.filter(d => d.get('shiftDateAsMoment').isSame(checkDay, 'day'));
        if (foundDays.length === 0) {
          // add it if not
          days.push(Day.create({
            shiftDate: checkDay.format('YYYY-MM-DD'),
            rotaStart: weekStart.format('YYYY-MM-DD')
          }));
        }
        checkDay.add(1, 'days');
      }

      // make sure days array is sorted
      days.sort(function(a, b) {
        return a.get('shiftDateAsMoment').startOf('day').valueOf() - b.get('shiftDateAsMoment').startOf('day').valueOf();
      });

      rotaWeeks.pushObject(Week.create({ start: weekStart, days, meta }));
    });

    // insert missing weeks
    var minDate = moment(weekStarts[0]);
    var maxDate = moment(Math.max(...weekStarts));
    while (minDate.isBefore(maxDate)) {
      var week = this.findWeekForDate(rotaWeeks, minDate);
      if (!week) {
        rotaWeeks.pushObject(Week.create({ start: minDate.clone(), days: [], meta }));
      }
      minDate.add(1, 'week');
    }

    // make sure our weeks are sorted in order
    rotaWeeks.sort(function(a, b) {
      return a.get('start').valueOf() - b.get('start').valueOf();
    });

    return rotaWeeks;
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
  },

  getWeekIndexForDate: function(weeks, date = Date.now()) {
    if (weeks.length === 0) {
      return 0;
    }

    let weekIndex = weeks.indexOf(this.findWeekForDate(weeks, date));

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

  getNextShiftFromWeeks(weeks, dateTime = Date.now()) {
    const checkDate = moment(dateTime);
    // get the day before, as this is needed to catch shifts spanning midnight
    const dayBefore = checkDate.clone().subtract(1, 'day');

    // iterate through weeks, and days, until we find a shift after our checkDate
    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      const week = weeks[weekIndex];

      // does the end of this week come after our checkDate?
      if (week.get('end').clone().add(1, 'day').isAfter(dayBefore)) {
        const days = week.days;

        for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
          const day = days[dayIndex];
          const dayDate = moment(day.get('shiftDate'));

          if (checkDate.isSame(dayDate, 'day') || dayBefore.isSame(dayDate, 'day')) {
            // as it's the same day, are there any shifts after current time?
            const shifts = day.shifts;

            for (let shiftIndex = 0; shiftIndex < shifts.length; shiftIndex++) {
              const shift = shifts[shiftIndex];
              const endTime = moment(shift.get('end'), "HH:mm");
              const endCheckTime = dayDate.clone().hour(endTime.hour());

              endCheckTime.minute(endTime.minute());
              if (shift.get('endAsMinutes') < shift.get('startAsMinutes')) {
                endCheckTime.add(1, 'days');
              }

              if (endCheckTime.isAfter(checkDate)) {
                return shift;
              }
            }
          } else if (checkDate.isBefore(dayDate, 'day')) {
            // day is after current date, so if we have any shifts grab the first
            if (day.shifts.length > 0) {
              return day.shifts[0];
            }
          }
        }
      }
    }
  },

  findOverlapForShift: function(weeks, shift) {
    var overlapFilter = function(overlap) {
      return overlap.shifts.contains(shift);
    };

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i];
      const days = week.get('days');
      for (let day = 0; day < days.length; day++) {
        // check the shift to see if it's in the overlappingShifts for the day
        let overlaps = days[day].get('overlappingShifts').filter(overlapFilter);
        if (overlaps && (overlaps.length !== 0)) {
          return overlaps[0];
        }
      }
    }
  }
});

export default Week;
