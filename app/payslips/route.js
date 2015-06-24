import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';
import Pageable from 'ess/mixins/route-pageable';

var paramParams = {
  refreshModel: true,
  replace: true
};

export default Ember.Route.extend(Pageable, FindWithCache, {

  title: 'MY PAYSLIPS',

  queryParams: {
    sort: paramParams,
    filters: paramParams
  },

  model: function(params) {
    return this.queryWithCache('payslip', params);
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
