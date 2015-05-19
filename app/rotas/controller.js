import Ember from 'ember';
import SetSelectedIndex from 'ess/mixins/controller-set-selected-index';

export default Ember.Controller.extend(SetSelectedIndex, {

  queryParams: ['filters'],

  attrs: {},

  filters: [{
    key: 'RequestDate',
    operator: 'eq',
    value: moment().format('YYYY-MM-DD')
  }, {
    key: 'NoPreviousWeeks',
    operator: 'eq',
    value: 2
  }, {
    key: 'NoFutureWeeks',
    operator: 'eq',
    value: 2
  }],

  actions: {
    setSelectedShift: function(shift) {
      this.set('attrs.selectedShift', shift);
    }
  }
});
