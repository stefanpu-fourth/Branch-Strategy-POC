import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';
import RenderNav from 'ess/mixins/render-nav';

export default Ember.Route.extend(FindWithCache, RenderNav, {
  rotaService: Ember.inject.service(),

  title: 'MY ROTAS',

  meta: null,

  model: function() {
    return Ember.RSVP.hash({
      holidayBalance: this.findAllWithCache('holidayBalance'),
      rotaSchedules: this.queryWithCache('rota-schedule', {
        RequestDate: moment().format('YYYY-MM-DD'),
        NoPreviousWeeks: 2,
        NoFutureWeeks: 2
      })
    });
  },

  afterModel: function (model) {
    this.meta = model.rotaSchedules.get('meta') || this.meta;
    model.rotaSchedules.set('meta', this.meta);

    model.rotaSchedules.forEach(day => {
      day.calculateShifts(this.meta);
    });
  },

  setupController: function(controller, model) {
    var rotaService = this.get('rotaService');
    var rotaWeeks = rotaService.getRotaWeeks(model.rotaSchedules);
    var selectedShift = rotaService.getNextShift(model.rotaSchedules);
    var selectedOverlap;
    if (selectedShift) {
      selectedOverlap = rotaService.findOverlapForShift(rotaWeeks, selectedShift);
    }
    if (selectedOverlap) {
      selectedShift = undefined;
    }

    controller.setProperties({
      'attrs.holiday': model.holidayBalance.get('firstObject'),
      'attrs.rotaWeeks': rotaWeeks,
      'attrs.defaultIndex': rotaService.getWeekIndexForDate(rotaWeeks),
      'attrs.selectedShift': selectedShift,
      'attrs.selectedOverlap': selectedOverlap,
      'attrs.selectedIndex': null,
      'attrs.isPanning': true
    });
  }
});
