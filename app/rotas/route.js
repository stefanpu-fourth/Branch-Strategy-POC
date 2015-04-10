import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return Ember.RSVP.hash({
      holidayBalance: this.store.find('holidaybalance')
    });
  },

  setupController: function (controller, model) {
    controller.set('attrs.holiday', model.holidayBalance.findBy('id','1'));
  }
});
