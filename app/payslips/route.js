import Ember from 'ember';
import Pageable from 'ess/mixins/route-pageable';
import SetSelectedIndex from 'ess/mixins/route-set-selected-index';
import config from 'ess/config/environment';

var paramParams = {
  refreshModel: true,
  replace: true
};

export default Ember.Route.extend(Pageable, SetSelectedIndex, {

  title: 'MY PAYSLIPS',

  collectionName: 'payslips',

  queryParams: {
    sort: paramParams,
    filters: paramParams
  },

  model: function(params) {
    return new Ember.RSVP.Promise((resolve) => {
      var records = this.store.all('payslip');
      return records.get('length') && !config.cacheResources ? resolve(records) : resolve(this.store.find('payslip', params));
    });
  },

  setupController: function(controller, model) {
    controller.set('attrs.payslips.content', model);
    controller.set('attrs.selectedIndex', null);
    controller.set('attrs.isPanning', true);
  }
});
