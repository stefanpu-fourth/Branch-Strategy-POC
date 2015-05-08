import Ember from 'ember';

export default Ember.Mixin.create({
  getFiltersString(filters) {
    return filters.reduce(this.getFilterParamString.bind(this), '$filter=');
  },

  getFilterParamString(param, filter, i, filters) {
    var key = this.getFilterKey(filter.key);
    var operand = this.getFilterOperator(filter.operator);
    var and = this.getAndString(filters.length, i);

    return `${param}${key} ${operand} ${filter.value}${and}`;
  },

  getFilterKey(key) {
    return key.capitalize();
  },

  getFilterOperator(operand) {
    //TODO: Assert that we have a valid operator
    return operand || 'eq';
  },

  getAndString(n, i) {
    return (n > 1 && i < n - 1) ? ' and ' : '';
  }

});
