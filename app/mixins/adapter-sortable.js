import Ember from 'ember';

export default Ember.Mixin.create({

  getQueryStringParts(type, query, params) {
    var { sort } = query;
    var { by, dir } = sort;

    if (by) {
      params.push(`$orderby=${this.getSortProp(by)} ${this.getSortDirection(dir)}`);
    }

    return this._super(type, query, params);
  },

  getSortProp: function(sortBy) {
    return sortBy.capitalize();
  },

  getSortDirection: function(sortDir) {
    return sortDir || 'desc';
  }
});
