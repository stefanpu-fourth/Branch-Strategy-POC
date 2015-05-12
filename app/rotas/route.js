import Ember from 'ember';

export default Ember.Route.extend({
  rotaService: Ember.inject.service(),

  model: function () {
    var rotaService = this.get('rotaService');
    return Ember.RSVP.hash({
      holidayBalance: this.store.find('holidayBalance'),
      rotaWeeks: rotaService.getRotaWeeks(new Date()),
      nextShift: rotaService.getNextShift()
    });
  },

  setupController: function (controller, model) {
    controller.setProperties({
      'attrs.holiday': model.holidayBalance,
      'attrs.rotaWeeks': model.rotaWeeks,
      'selectedShift': model.nextShift,
      'selectedIndex': null
    });
  }
});
