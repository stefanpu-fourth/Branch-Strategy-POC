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

  getRotaWeeks: function(date = Date.now(), prevWeeks = 2, futureWeeks = 2) {
    return this._fetchSchedules(date, prevWeeks, futureWeeks).then(schedules => {
      this.set('fetchedSchedules.content', schedules);
      var start = moment(this.get('fetchedSchedules.firstObject.shiftDate')),
          rotaWeeks = [];

      for (let i=0;i<prevWeeks + futureWeeks + 1; i++) {
        let shiftStart = start.clone().add(7 * i, 'days'),
           filterStart = shiftStart.clone().subtract(1, 'days'),
                   end = shiftStart.clone().add(7, 'days');
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
          }
        });

        rotaWeeks.pushObject(RotaWeek.forDate(shiftStart, shifts));
      }

      return rotaWeeks;
    });
  },

  _fetchSchedules: function(date, prevWeeks, futureWeeks) {
    var store = this.get('store');
    var fetchedSchedules = store.find('rota-schedule', {
      requestedDate: moment(date).format('YYYY-MM-DD'),
      numPreviousWeeks: prevWeeks,
      numFutureWeeks: futureWeeks
    });
    return fetchedSchedules;
  }
});
