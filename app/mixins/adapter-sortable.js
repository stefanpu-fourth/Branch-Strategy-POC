import Ember from 'ember';

export default Ember.Mixin.create({

  getQueryStringParts(type, query, params) {
    var sort = query.sort;
    var sortBy = sort.by;
    var sortDir = sort.dir;

    if (sortBy) {
      params.push(`$orderby=${this.getSortProp(sortBy)} ${this.getSortDirection(sortDir)}`);
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
