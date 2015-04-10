import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return Ember.RSVP.hash({
      employment: this.store.find('mainemployment', 1),
      employee: this.store.find('employee', 1),
      location: this.store.find('location', 1),
      company: this.store.find('company', 1)
    });
  },

  setupController: function (controller, model) {
    controller.set('attrs.employment', model.employment);
    controller.set('attrs.employee', model.employee);
  }

});
