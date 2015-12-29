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
  }

});

export default Week;
