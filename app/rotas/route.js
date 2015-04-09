import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return Ember.RSVP.hash({
      //rotas:this.store.find('rotasitem'), //rotaschedule
      holidayBalance: this.store.find('holidaybalance') //holiday balance
    });
  },

  setupController: function (controller, model) {
    controller.set('attrs.holiday', model.holidayBalance.findBy('id','1'));
    //controller.set('attrs.rotas', model.rotas);
  }
});
