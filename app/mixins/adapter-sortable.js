import Ember from 'ember';

export default Ember.Mixin.create({
  getSortString: function(sortBy, sortDir) {
    if (!sortBy) {
      return '';
    }
    return `&$orderby=${this.getSortProp(sortBy)} ${this.getSortDirection(sortDir)}`;
  },

  getSortProp: function(sortBy) {
    return sortBy.capitalize();
  },

  getSortDirection: function(sortDir) {
    return sortDir || 'desc';
  }
});
