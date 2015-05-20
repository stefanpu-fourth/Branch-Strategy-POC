import Ember from 'ember';

export default Ember.Mixin.create({

  getQueryStringParts(type, query, params) {
    var { filters } = query;

    if (filters.length) {
      params.push(filters.reduce(this.getFilterParamString.bind(this), '$filter='));
    }

    return this._super(type, query, params);
  },

  getFilterParamString(param, filter, i, filters) {
    var key = filter.key.capitalize();
    var operator = filter.operator || 'eq';
    var and = this.getAndString(filters.length, i);

    return `${param}${key} ${operator} ${filter.value}${and}`;
  },

  getAndString(length, index) {
    return (length > 1 && index < length - 1) ? ' and ' : '';
  }

});
