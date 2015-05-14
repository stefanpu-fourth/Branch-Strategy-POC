import Ember from 'ember';
import Pageable from 'ess/mixins/controller-pageable';
import SetSelectedIndex from 'ess/mixins/controller-set-selected-index';

export default Ember.Controller.extend(Pageable, SetSelectedIndex, {

  queryParams: ['sort', 'filters'],

  sort: {
    by: 'processingDate',
    dir: 'asc'
  },

  filters: [{
    key: 'processingDate',
    operator: 'ge',
    value: moment().subtract(12, 'months').format('YYYY-MM-DD')
  }],

  attrs: {
    payslips: Ember.ArrayProxy.create()
  }
});
