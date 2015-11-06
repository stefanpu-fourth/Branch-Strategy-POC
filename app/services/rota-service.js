import Ember from 'ember';
import i18n from 'ess/i18n';

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

  getRotaWeeks: function(schedules) {
    // consolidate schedules into weeks
    // including consolidating shifts from multiple duplicate days into one day
    var rotaWeeks = [];
    var meta = schedules.get('meta');
    var store = schedules.get('firstObject.store');

    // reset calculated shifts, as otherwise for subsequent calls we get lots of duplicates
    schedules.forEach((s) => {
      s.calculateShifts(meta);
    });

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
      let shiftStart = moment(weekDate);
      let filterStart = shiftStart.clone().subtract(1, 'days');
      let end = shiftStart.clone().add(7, 'days');

      let schedulesForDate = schedules.filter(s => {
        return s.isBetweenMoments(filterStart, end);
      });

      let shiftDates = schedulesForDate.mapBy('shiftDate').map(d => d.valueOf());

      schedulesForDate.forEach((s, index) => {
        let dayTypes = new Set();
        if (s.get('isNotRota') && (s.get('shifts.length') === 0)) {
          dayTypes.add(s.get('type'));
        }
        let shiftDate = s.get('shiftDate').valueOf();
        let dupeIndex = shiftDates.lastIndexOf(shiftDate);
        while (dupeIndex !== index) {
          let dupeSchedule = schedulesForDate[dupeIndex];
          dupeSchedule.get('shifts').forEach(ds => {
            s.get('shifts').push(ds);
          });
          // TODO: we're only merging in types when we have shifts in other records - this may be flawed
          // essentially this is a workaround to deal with back-end data
          if (dupeSchedule.get('isNotRota') && (dupeSchedule.get('shifts.length') === 0)) {
            dayTypes.add(dupeSchedule.get('type'));
          }
          schedulesForDate.splice(dupeIndex, 1);
          shiftDates.splice(dupeIndex, 1);
          s.set('shifts', s.get('shifts').sort(function(a, b) {
            return a.start.localeCompare(b.start);
          }));
          dupeIndex = shiftDates.lastIndexOf(shiftDate);
        }
        s.set('displayTypes', [...dayTypes].sort());
      });

      // insert missing days here (if wanted)
      var checkDay = shiftStart.clone();
      while (checkDay.isBefore(end)) {
        // find out if we've got this day
        let foundDays = schedulesForDate.filter(d => moment(d.get('shiftDate')).isSame(checkDay, 'day'));
        if (foundDays.length === 0) {
          // add it if not
          schedulesForDate.push(
            store.createRecord('rota-schedule', {
              shiftDate: checkDay.format('YYYY-MM-DD'),
              rotaStart: shiftStart.format('YYYY-MM-DD'),
              type: 'off'
            })
          );
        }
        checkDay.add(1, 'days');
      }

      // make sure schedulesForDate array is in order
      schedulesForDate.sort(function(a, b) {
        return moment(a.get('shiftDate')).startOf('day').valueOf() - moment(b.get('shiftDate')).startOf('day').valueOf();
      });

      rotaWeeks.pushObject(RotaWeek.forDate(shiftStart, schedulesForDate, meta));
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
    let startDateTime = moment(shift.start, "HHmm");
    let endDateTime = moment(shift.end, "HHmm");

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

  getNextShift: function(schedules, date = Date.now()) {
    return this._findShift(schedules, date);
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
      if (date.isBetween(moment(week.get('start')).subtract(1, 'ms'), week.get('end'))) {
        foundWeek = week;
      }
    });
    return foundWeek;
  }
});
