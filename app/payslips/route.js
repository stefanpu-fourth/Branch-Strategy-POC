import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    var processingDate = moment().subtract(12, 'months').format('YYYY-MM-DD');
    var payslips = this.store.all('payslip');
    if (!Ember.isEmpty(payslips)) {
      return payslips;
    }

    return this.store.find('payslip', {
      'ProcessingDate': processingDate
    });
  },

  setupController: function (controller, model) {
    controller.set('attrs.payslips.content', model);
    controller.set('attrs.selectedIndex', null);
    controller.set('attrs.isPanning', true);
  },

  actions: {
    setSelectedIndex: function (index) {
      var attrs = this.get('controller.attrs');
      var currentIndex = attrs.selectedIndex;

      index = typeof index !== 'undefined' && index !== null ? index : attrs.payslips.get('content.length') - 1;

      if ((typeof currentIndex !== 'undefined' || currentIndex !== null) && index === currentIndex) {
        return;
      }

      this.set('controller.attrs.selectedIndex', index);
      this.set('controller.attrs.isPanning', typeof currentIndex === 'undefined' || currentIndex === null);
    }
  }

});
