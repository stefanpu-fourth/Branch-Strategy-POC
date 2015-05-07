import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [ 'sort', 'filters' ],

  sort: {
    by: 'processingDate',
    dir: 'desc'
  },

  filters: [
    { key: 'processingDate', operator: 'ge', value: moment().subtract(12, 'months').format('YYYY-MM-DD') }
  ],

  attrs: {
    payslips: Ember.ArrayProxy.create()
  }
});
