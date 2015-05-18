import Ember from 'ember';

export default Ember.Route.extend({
  rotaService: Ember.inject.service(),

  title: 'MY ROTAS',

  model: function() {
    return Ember.RSVP.hash({
      holidayBalance: this.store.find('holidayBalance'),
      rotaSchedules: this.store.find('rota-schedule', {
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
