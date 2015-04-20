import Ember from 'ember';

export default Ember.Route.extend({
  rotaService: Ember.inject.service(),

  model: function () {
    var rotaService = this.get('rotaService');
    return Ember.RSVP.hash({
      holidayBalance: this.store.find('holidayBalance'),
      rotaWeeks: rotaService.getRotaWeeks(),
      nextShift: rotaService.getNextShift()
    });
  },

  setupController: function (controller, model) {
    //this.set('rotaService.currentPosition', moment().startOf('isoWeek').toDate());
    controller.setProperties({
      'attrs.holiday': model.holidayBalance.findBy('id', '1'),
      'attrs.rotaWeeks': model.rotaWeeks,
      'selectedShift': model.nextShift,
      'selectedIndex': 2
    });
  }
});
