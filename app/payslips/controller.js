import Ember from 'ember';
import Pageable from 'ess/mixins/controller-pageable';
import SetSelectedIndex from 'ess/mixins/controller-set-selected-index';

export default Ember.Controller.extend(Pageable, SetSelectedIndex, {

  attrs: {},

  queryParams: ['sort', 'filters'],

  sort: {
    by: 'processingDate',
    dir: 'desc'
  },

  filters: [{
    key: 'processingDate',
    operator: 'ge',
    value: moment().subtract(12, 'months').format('YYYY-MM-DD')
  }],

  payslipSort: ['processingDate'],
  payslips: Ember.computed.sort('attrs.rawPayslips', 'payslipSort')
});
