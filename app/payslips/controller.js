import Ember from 'ember';
import Pageable from 'ess/mixins/controller-pageable';

export default Ember.Controller.extend(Pageable, {

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
