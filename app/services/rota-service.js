import Ember from 'ember';
import i18n from 'ess/i18n';
import Day from 'ess/models/day';

var dayMonthFormat = i18n.t('dateFormats.dayMonth');

var RotaWeek = Ember.Object.extend({
  start: null,

  shifts: [],

  end: function() {
    return moment(this.get('start')).add(6, 'day');
  }.property('start'),

  formattedDateRange: function() {
    return moment(this.get('start')).format(dayMonthFormat) + " - " + moment(this.get('end')).format(dayMonthFormat);
  }.property('start', 'end')
});

RotaWeek.reopenClass({
  forDate: function(date, shifts, meta) {
    return RotaWeek.create({
      start: moment(date),
      shifts: shifts,
      meta: meta
    });
  }
});

export default Ember.Service.extend({

  getRotaWeeks: function(schedules, meta) {
    // consolidate schedules into weeks
    // including consolidating shifts from multiple duplicate days into one day
    var rotaWeeks = [];
    meta = meta || schedules.get('meta');

    // revised logic
    // this method is now a week consolidator for the schedules passed in
    // it should thus get the weeks from the schedules
    // it should fill in days that were missing
    // it should fill in weeks if they were missing - but maybe without any days?
    //
    // NB as the method ignored the date passed in it's been removed
    //
    // NB2 as we no longer pass in a date, we cannot fill in weeks missing from the beginning/end of schedule
    // - even if we had a date this would be problematic

    var weekStarts = schedules.mapBy('rotaStart').map(d => moment(d).valueOf()).uniq().sortBy();

    weekStarts.forEach(function(weekDate) {
      let weekStart = moment(weekDate);
      let filterStart = weekStart.clone().subtract(1, 'days');
      let end = weekStart.clone().add(7, 'days');

      let schedulesForDate = schedules.filter(s => {
        return s.isBetweenMoments(filterStart, end);
      });

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

      rotaWeeks.pushObject(RotaWeek.forDate(weekStart, days, meta));
    });

    // insert missing weeks
    var minDate = moment(weekStarts[0]);
    var maxDate = moment(Math.max(...weekStarts));
    while (minDate.isBefore(maxDate)) {
      var week = this.findWeekForDate(rotaWeeks, minDate);
      if (!week) {
        rotaWeeks.pushObject(RotaWeek.forDate(minDate, [], meta));
      }
      minDate.add(1, 'week');
    }

    // make sure our weeks are sorted in order
    rotaWeeks.sort(function(a, b) {
      return a.get('start').valueOf() - b.get('start').valueOf();
    });

    return rotaWeeks;
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

  _findShift: function(schedules, date) {
    const sortedSchedules = Ember.A(schedules).sortBy('rotaStart', 'shiftDate', 'shiftTimes.0');

    let today = moment(date).startOf('day');

    let foundShift;

    let scheduleCount = sortedSchedules.get('length');

    for (let i = 0; i < scheduleCount; i++) {
      let schedule = sortedSchedules.objectAt(i);
      let scheduleMoment = moment(schedule.get('shiftDate'));
      if (scheduleMoment.isSame(today) || scheduleMoment.isAfter(today)) {
        let shifts = schedule.get('shifts') || [];

        foundShift = shifts.find(shift => {
          return this._shiftMatches(shift, date, scheduleMoment);
        });

        if (!Ember.isBlank(foundShift)) {
          break;
        }
      }
    }

    return foundShift;
  },

  getNextShiftFromWeeks(weeks, date = Date.now()) {
    // gather all the shifts from the weeks after the date
    let checkMoment = moment(date);
    let shifts = weeks.reduce(
      (prev, week) => {
        return prev.concat(week.shifts.reduce(
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
      let days = week.get('shifts');
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
