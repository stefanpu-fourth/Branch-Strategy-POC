import Ember from 'ember';

export default Ember.Route.extend({
  rotaService: Ember.inject.service(),

  model: function () {
    return Ember.RSVP.hash({
      holidayBalance: this.store.find('holidayBalance'),
      rotaWeeks: this.get('rotaService').getRotaWeeks()
    });
  },

  setupController: function (controller, model) {
    //this.set('rotaService.currentPosition', moment().startOf('isoWeek').toDate());
    controller.setProperties({
      'attrs.holiday': model.holidayBalance.findBy('id','1'),
      'attrs.rotaWeeks': model.rotaWeeks,
      'selectedIndex': 2
    });
  }
});
