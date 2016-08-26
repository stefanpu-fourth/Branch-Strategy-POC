import Ember from 'ember';
import i18n from 'ess/i18n';
import Day from 'ess/models/day';

let Week = Ember.Object.extend({
  start: null,
  days: [],
  meta: null,

  end: function() {
    return moment(this.get('start')).add(6, 'day');
  }.property('start'),

  formattedDateRange: function() {
    const dayMonthFormat = i18n.t('dateFormats.dayMonth');

    return `${moment(this.get('start')).format(dayMonthFormat)} - ${moment(this.get('end')).format(dayMonthFormat)}`;
  }.property('start', 'end'),

  getNextShiftFromMoment(now, dayBefore = now.clone().subtract(1, 'day')) {
    // we'll only find a shift if this week ends after 'now'
    if (this.get('end').clone().add(1, 'day').isAfter(dayBefore)) {
      const days = this.days;

      for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        const shift = days[dayIndex].getNextShiftFromMoment(now, dayBefore);

        if (shift) {
          return shift;
        }
      }
    }
  }
});

Week.reopenClass({
  weeksFromSchedules(rotaSchedules, meta = rotaSchedules.get('meta')) {
    // get a unique list of our rotaStart dates from our rotaSchedule records
    const weekStarts = rotaSchedules.mapBy('rotaStart').map(d => moment(d).valueOf()).uniq();

    const rotaWeeks = weekStarts.map(weekDate => {
      const weekStart = moment(weekDate);
      const filterStart = weekStart.clone().subtract(1, 'days');
      const end = weekStart.clone().add(7, 'days');
      const schedulesForWeek = rotaSchedules.filter(s => s.isBetweenMoments(filterStart, end));
      let days = Day.daysFromSchedules(schedulesForWeek, meta);
      let checkDay = weekStart.clone();

      // add in any days that might be missing
      while (checkDay.isBefore(end)) {
        // find out if we've got this day
        const foundDays = days.filter(d => d.get('shiftDateAsMoment').isSame(checkDay, 'day'));

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
      days.sort((a, b) =>
        a.get('shiftDateAsMoment').startOf('day').valueOf() - b.get('shiftDateAsMoment').startOf('day').valueOf()
      );

      return Week.create({ start: weekStart, days, meta });
    });

    //
    // THIS insert missing weeks bit COMMENTED OUT, IT SEEMINGLY CREATES THE DUPLICATION weeks
    // TODO: Check with Mel if the API is actually handling this now?
    //
    // insert missing weeks
    // const maxDate = moment(Math.max(...weekStarts));
    // let minDate = moment(weekStarts[0]);
    //
    // while (minDate.isBefore(maxDate)) {
    //   const week = this.findWeekForDate(rotaWeeks, minDate);
    //
    //   if (!week) {
    //     rotaWeeks.pushObject(Week.create({ start: minDate.clone(), days: [], meta }));
    //   }
    //   minDate.add(1, 'week');
    // }

    // make sure our weeks are sorted in order
    rotaWeeks.sort((a, b) => a.get('start').valueOf() - b.get('start').valueOf());

    return rotaWeeks;
  },

  findWeekForDate: function(weeks, date = Date.now()) {
    const checkDate = moment(date);

    return weeks.filter(week => (
      checkDate.isBetween(
        moment(week.get('start')).subtract(1, 'ms'),
        moment(week.get('end')).add(1, 'day'),
        'day'
      )
    ))[0];
  },

  getWeekIndexForDate: function(weeks, date = Date.now()) {
    if (weeks.length === 0) {
      return 0;
    }

    const weekIndex = weeks.indexOf(this.findWeekForDate(weeks, date));

    if (weekIndex === -1) {
      if (moment(date).isBefore(weeks[0].get('start'))) {
        return 0;
      } else {
        return weeks.length - 1;
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
      const shift = weeks[weekIndex].getNextShiftFromMoment(checkDate, dayBefore);

      if (shift) {
        return shift;
      }
    }
  },

  findOverlapForShift: function(weeks, shift) {
    const overlapFilter = overlap => overlap.shifts.contains(shift);

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
