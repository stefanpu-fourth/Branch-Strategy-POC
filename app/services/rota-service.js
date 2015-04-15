import Ember from 'ember';

var RotaWeek = Ember.Object.extend({
  start: null,

  shifts: function() {
    return this.get('store').filter('rotaSchedule', s => {
      var start = this.get('start').clone().subtract(1, 'day'),
          end = start.clone().add(8, 'days');

      return moment(s.get('shiftDate')).isBetween(start, end);
    });
  }.property('start'),

  end: function() {
    return moment(this.get('start')).add(6, 'day');
  }.property('start'),

  formattedDateRange: function() {
    return moment(this.get('start')).format("DD MMM") + " - " + moment(this.get('end')).format("DD MMM")
  }.property('start', 'end')
});

RotaWeek.reopenClass({
  forMoment: function(date, store) {
    return RotaWeek.create({start: moment(date), store: store});
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
          rotaWeeks = [],
          store = this.get('store');

      for (let i=0;i<prevWeeks + futureWeeks + 1; i++) {
        var shiftStart = start.clone().add(7 * i, 'days');
        rotaWeeks.pushObject(RotaWeek.forMoment(shiftStart, store));
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
