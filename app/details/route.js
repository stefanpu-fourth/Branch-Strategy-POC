import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    var employement = this.store.all('mainemployment');

    if (Ember.isEmpty(employement)) {
      employement = this.store.find('mainemployment');
    }

    return Ember.RSVP.hash({
      employment: employement,
      employee: this.store.find('employee', 1)
    });
  },

  setupController: function (controller, model) {
    controller.set('attrs.employment', model.employment);
    controller.set('attrs.employee', model.employee);
  }

});
