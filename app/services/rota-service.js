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

  init: function() {
    this.set('fetchedSchedules', Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      content: [],
      sortProperties: ['shiftDate']
    }));
  },

  getRotaWeeks: function(schedules, date = Date.now(), prevWeeks = 2, futureWeeks = 2) {
    this.set('fetchedSchedules.content', schedules);
    var start = moment(this.get('fetchedSchedules.firstObject.shiftDate'));
    var rotaWeeks = [];
    var meta = schedules.get('meta') || this.get('meta');

    for (let i = 0; i < prevWeeks + futureWeeks + 1; i++) {
      let shiftStart = start.clone().add(7 * i, 'days');
      let filterStart = shiftStart.clone().subtract(1, 'days');
      let end = shiftStart.clone().add(7, 'days');

      let schedulesForDate = schedules.filter(s => {
        return s.isBetweenMoments(filterStart, end);
      });

      let shiftDates = schedulesForDate.mapBy('shiftDate').map(d => d.valueOf());

      schedulesForDate.forEach((s, index) => {
        let dayTypes = new Ember.Set();
        // reset calculated shifts, as otherwise for subsequent calls we get lots of duplicates
        s.calculateShifts(meta);
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
        s.set('displayTypes', dayTypes.toArray().sort());
      });

      rotaWeeks.pushObject(RotaWeek.forDate(shiftStart, schedulesForDate, meta));
    }

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
    var sortedSchedules = Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, Ember.Array, {
      content: schedules,
      sortProperties: ['shiftDate', 'shiftTimes.0']
    });

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

  // TODO SJ these params should be fetched from
  // config. probably. They don't make much sense in the context of
  // this function, but are needed in order to fetch the data if not
  // there. Or maybe it should assume data already there. Throw an
  // exception if the promise isn't there maybe???
  getNextShift: function(schedules, date = Date.now()) {
    return this._findShift(schedules, date);
  }
});
