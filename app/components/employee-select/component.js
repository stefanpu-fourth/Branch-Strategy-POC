import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['employee-select'],
  employees: [],
  employeeIds: [],
  selectedEmployeeId: null,

  init: function() {
    this.set('employeeIds', this.get('employees').map(function(item) {
      return item.get('id');
    }));

    if (!this.get('selectedEmployeeId')) {
      this.set('selectedEmployeeId', this.get('employeeIds.firstObject'));
    }

    return this._super();
  },

  change: function() {
    this.sendAction('setCurrentEmployee', this.get('selectedEmployeeId'));
  }
});
