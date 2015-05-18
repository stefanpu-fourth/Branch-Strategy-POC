import Ember from 'ember';
import Pageable from 'ess/mixins/route-pageable';

var paramParams = {
  refreshModel: true,
  replace: true
};

export default Ember.Route.extend(Pageable, {

  title: 'MY PAYSLIPS',

  queryParams: {
    sort: paramParams,
    filters: paramParams
  },

  model: function(params) {
    return this.store.find('payslip', params);
  },

  setupController: function(controller, model) {
    controller.setProperties({
      'attrs.payslips.content': model,
      'attrs.defaultIndex': model.get('length') - 1,
      'attrs.selectedIndex': null,
      'attrs.isPanning': true
    });
  }
});
