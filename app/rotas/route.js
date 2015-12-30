import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';
import RenderNav from 'ess/mixins/render-nav';
import ErrorNotifications from 'ess/mixins/error-notifications';
import Week from 'ess/models/week';

export default Ember.Route.extend(FindWithCache, RenderNav, ErrorNotifications, {
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
  },

  setupController: function(controller, model) {
    var rotaService = this.get('rotaService');
    var rotaWeeks = Week.weeksFromSchedules(model.rotaSchedules, this.meta);
    var selectedShift = Week.getNextShiftFromWeeks(rotaWeeks);
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
      'attrs.defaultIndex': Week.getWeekIndexForDate(rotaWeeks),
      'attrs.selectedShift': selectedShift,
      'attrs.selectedOverlap': selectedOverlap,
      'attrs.selectedIndex': null,
      'attrs.isPanning': true
    });
  }
});
