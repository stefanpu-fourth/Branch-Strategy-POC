import Ember from 'ember';

var RotaWeek = Ember.Object.extend({
  start: null,

  shifts: [],

  end: function() {
    return moment(this.get('start')).add(6, 'day');
  }.property('start'),

  formattedDateRange: function() {
    return moment(this.get('start')).format("DD MMM") + " - " + moment(this.get('end')).format("DD MMM");
  }.property('start', 'end')
});

RotaWeek.reopenClass({
  forDate: function(date, shifts) {
    return RotaWeek.create({ start: moment(date), shifts: shifts });
  }
});

export default Ember.Service.extend({

  init: function() {
    this.set('fetchedSchedules', Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      content: [],
      sortProperties: ['shiftDate']
    }));
  },

  store: Ember.inject.service(),

  scheduleFetchPromise: null,

  getRotaWeeks: function(date = Date.now(), prevWeeks = 2, futureWeeks = 2) {
    if (!this.scheduleFetchPromise) {
      this.scheduleFetchPromise = this._fetchSchedules(date, prevWeeks, futureWeeks);
    }

    return this.scheduleFetchPromise.then(schedules => {
      console.log('getRotaWeeks resolved');
      this.set('fetchedSchedules.content', schedules);
      var start = moment(this.get('fetchedSchedules.firstObject.shiftDate'));
      var rotaWeeks = [];

      for (let i=0;i<prevWeeks + futureWeeks + 1; i++) {
        let shiftStart = start.clone().add(7 * i, 'days');
        let filterStart = shiftStart.clone().subtract(1, 'days');
        let end = shiftStart.clone().add(7, 'days');
        let shifts = [];
        schedules.forEach(s => {
          if (moment(s.get('shiftDate')).isBetween(filterStart, end)) {
            shifts.push(s);
          }
        });

        let shiftDates = shifts.map(s => { return s.get('shiftDate'); });

        shifts.forEach((s, index) => {
          var dupeIndex = shiftDates.lastIndexOf(s.get('shiftDate'));
          if (dupeIndex !== index) {
            shifts[dupeIndex].get('shifts').forEach(ds => { s.get('shifts').push(ds); });
            shifts.splice(dupeIndex, 1);
            shiftDates.splice(dupeIndex, 1);
            s.set('shifts', s.get('shifts').sort(function(a, b) {
              return a.start.localeCompare(b.start);
            }));
          }
        });

        rotaWeeks.pushObject(RotaWeek.forDate(shiftStart, shifts));
      }

      return rotaWeeks;
    });
  },

  getNextShift: function(date = Date.now(), prevWeeks = 2, futureWeeks = 2) {
    var sortedSchedules = Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, Ember.Array, {
      content: [],
      sortProperties: ['shiftDate', 'shiftTimes.0']
    });

    if (!this.scheduleFetchPromise) {
      this.scheduleFetchPromise = this._fetchSchedules(date, prevWeeks, futureWeeks);
    }

    return this.scheduleFetchPromise.then(schedules => {
      console.log('getNextShift - resolved');
      sortedSchedules.set('content', schedules);
      let today = moment(date).startOf('day');

      let foundShift;

      sortedSchedules.find(day => {
        let dayMoment = moment(day.get('shiftDate'));
        if (dayMoment.isSame(today) || dayMoment.isAfter(today)) {
          let shifts = day.get('shifts') || [];

          foundShift = shifts.find(shift => {
            let startDateTime = moment(shift.start, "HHmm");
            let endDateTime = moment(shift.end, "HHmm");

            let endCheckTime = dayMoment.clone().hour(endDateTime.hour());
            endCheckTime.minute(endDateTime.minute());

            if (endDateTime.isBefore(startDateTime)) {
              endCheckTime.add(1, 'days');
            }

            return endCheckTime.isAfter(date);
          });

          return foundShift;
        }
      });

      return foundShift;
    });
  },

  _fetchSchedules: function(date, prevWeeks, futureWeeks) {
    var store = this.get('store');
    var fetchedSchedules = store.find('rota-schedule', {
      RequestDate: moment(date).format('YYYY-MM-DD'),
      NoPreviousWeeks: prevWeeks,
      NoFutureWeeks: futureWeeks
    }).then(schedules => {
      schedules.forEach(day => {
        var times = day.get('shiftTimes');
        if (times) {
          let newShifts = times.map(function(startTime, index) {
            if ((index % 2) === 0) {
              var endTime = times[index + 1];
              if (startTime !== endTime) {
                return {
                  start: startTime,
                  end: endTime,
                  location: day.get('location'),
                  jobTitle: day.get('jobTitle')
                };
              }
            }
          });
          day.set('shifts', newShifts.filter(shift => { return shift !== undefined; }));
        }
      });
      return schedules;
    });
    return fetchedSchedules;
  }
});
