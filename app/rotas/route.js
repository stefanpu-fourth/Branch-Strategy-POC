import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';

var paramParams = {
  refreshModel: true,
  replace: true
};

export default Ember.Route.extend(FindWithCache, {
  rotaService: Ember.inject.service(),

  title: 'MY ROTAS',

  queryParams: {
    filters: paramParams
  },

  model: function(params) {
    return Ember.RSVP.hash({
      holidayBalance: this.findWithCache('holidayBalance'),
      rotaSchedules: this.findWithCache('rota-schedule', params)
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
