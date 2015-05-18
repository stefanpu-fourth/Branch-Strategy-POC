import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';

export default Ember.Route.extend(FindWithCache, {
  rotaService: Ember.inject.service(),

  title: 'MY ROTAS',

  model: function() {
    return Ember.RSVP.hash({
      holidayBalance: this.findWithCache('holidayBalance'),
      rotaSchedules: this.findWithCache('rota-schedule', {
        RequestDate: moment().format('YYYY-MM-DD'),
        NoPreviousWeeks: 2,
        NoFutureWeeks: 2
      })
    });
  },

  afterModel: function (model) {
    model.rotaSchedules.forEach(day => {
      day.calculateShifts(model.rotaSchedules.get('meta'));
    });
  },

  setupController: function(controller, model) {
    var rotaService = this.get('rotaService');

    controller.setProperties({
      'attrs.holiday': model.holidayBalance.get('firstObject'),
      'attrs.rotaWeeks': rotaService.getRotaWeeks(model.rotaSchedules),
      'attrs.defaultIndex': 2,
      'attrs.selectedShift': rotaService.getNextShift(model.rotaSchedules),
      'attrs.selectedIndex': null,
      'attrs.isPanning': true
    });
  }
});
