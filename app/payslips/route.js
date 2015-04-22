import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.find('paysliplineitem');
  },

  setupController: function (controller, model) {
    controller.set('attrs.lineitems', model);
    controller.set('attrs.selectedIndex', 0);
  },

  actions: {
    setSelectedIndex: function (index=0) {
      if (index === this.get('controller.attrs.selectedIndex')) {
        return;
      }

      this.set('controller.attrs.selectedIndex', index);
    }
  }

});
