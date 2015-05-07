import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [ 'sort' ],

  sort: {
    by: 'processingDate',
    dir: 'desc'
  },

  attrs: {
    payslips: Ember.ArrayProxy.create()
  }
});
