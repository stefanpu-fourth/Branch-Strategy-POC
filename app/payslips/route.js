import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    var processingDate = moment().subtract(12, 'months').format('YYYY-MM-DD');
    var payslips = this.store.all('payslip');
    if (payslips.get('length') > 0) {
      return payslips;
    }

    return this.store.find('payslip', {
      'ProcessingDate': processingDate
    });
  },

  setupController: function (controller, model) {
    controller.set('attrs.payslips.content', model);
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
